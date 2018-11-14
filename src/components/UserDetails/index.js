import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import {
  LinearProgress,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
} from '@material-ui/core';

import {
  Book as BookIcon,
  Error as ErrorIcon,
  Edit as EditIcon,
} from '@material-ui/icons';

import DeleteUserDialog from '../DeleteUserDialog';
import UserEditDialog from '../UserEditDialog';
import {getUserDetailsQuery} from '../../queries';
import * as S from '../../strings';
import './style.css';

/**
 * Displays details about a specific user.
 */
class UserDetails extends Component {

  /**
   * Creates a new instance of UserDetails.
   * @param {Object} props The component's props.
   */
  constructor(props) {

    super(props);
    this.state = {
      loading: false,
      deletedId: -1,
      updatedUser: null,
      updatedId: -1,
      deleteUserDialogOpened: false,
      userUpdateDialogOpened: false,
    };

  }

  /**
   * Handles the delete user button click.
   */
  handleDeleteClick() {

    this.setState({deleteUserDialogOpened: true});

  }

  /**
   * Handles the edit user button click.
   */
  handleEditClick() {

    this.setState({userUpdateDialogOpened: true});

  }

  /**
   * Handles the delete user dialog closing.
   * @param {Boolean} deleted True if the current user was deleted.
   */
  handleDeleteUserDialogClose(deleted) {

    this.setState({
      deleteUserDialogOpened: false,
    });

    if (deleted) {

      this.setState({
        deletedId: this.props.userId,
      });

    }

  }

  /**
   * Handles the user update dialog closing.
   * @param {Object} user The new User object if the user was updated.
   */
  handleUserUpdateDialogClose(user) {

    this.setState({
      userUpdateDialogOpened: false,
    });

    if (user) {

      this.setState({
        updatedUser: user,
        updatedId: user.id,
      });

    }

  }

  /**
   * Displays the details about the particular user.
   * @return {*}
   */
  displayUserDetails() {

    // get the user data from the updatedUser if neccessary
    // otherwise get it from the props
    const data = this.state.updatedUser &&
      (this.state.updatedId === this.props.userId)
        ? {user: this.state.updatedUser}
        : this.props.data;

    if (data.loading) {

      // data is not ready
      if (this.state.loading === false) {

        this.setState({loading: true});

      }

    } else {

      if (this.state.loading === true) {

        this.setState({loading: false});

      }

      if (data.user && data.user.id === this.props.userId) {

        // user was selected
        const user = data.user;
        const previousBookings = user.history.filter((booking) => {

          const date = new Date(booking.date);
          return (date < Date.now() && booking.type === 'attendance');

        });
        const currentBookings = user.history.filter((booking) => {

          const date = new Date(booking.date);
          return (date >= Date.now() && booking.type === 'attendance');

        });

        return (
          <div>
            <Grid container direction='column'>
              <Grid item container direction='row' justify='space-between'>
                <Grid item>
                  <Typography variant='h4'>
                    {user.lastName}, {user.firstName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    color='primary'
                    variant='outlined'
                    onClick={() => this.handleEditClick()}>
                    Edit
                    <EditIcon />
                  </Button>
                  <span className='space-right'></span>
                  <Button
                    variant='outlined'
                    color='secondary'
                    disabled={
                      parseInt(localStorage.getItem('user_id')) === user.id
                    }
                    onClick={() => this.handleDeleteClick()}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div className='margin-1em'>
                  <Divider />
                </div>
              </Grid>
              <Grid item container
                justify='space-evenly' direction='row' className='center'>
                <Grid item>
                  <Typography variant='h6'>
                    ID Number:
                  </Typography>
                  <br />
                  <Typography>
                    {user.id}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h6'>
                    Phone Number:
                  </Typography>
                  <br />
                  <Typography>
                    {
                      user.phone
                        ? (<a href={'tel:' + user.phone}>{user.phone}</a>)
                        : 'N/A'
                    }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h6'>
                    Email:
                  </Typography>
                  <br />
                  <Typography>
                    <a href={'mailto:' + user.email}>{user.email}</a>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h6'>
                    Account Type:
                  </Typography>
                  <br />
                  <Typography>
                    {user.role[0].toUpperCase() + user.role.substr(1)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <div className='margin-1em'>
              <Divider />
            </div>

            <Button variant='outlined' disabled>
              Manage Bookings
              <BookIcon />
            </Button>

            <List component='nav'>
              <li>
                <ul>
                  <ListSubheader>Current Bookings</ListSubheader>
                  {
                    currentBookings.map(
                        (booking, index) =>
                          this.renderBooking(booking, 'current', index)
                    )
                  }
                </ul>
              </li>
              <li>
                <ul>
                  <ListSubheader>Previous Bookings</ListSubheader>
                  {
                    previousBookings.map(
                        (booking, index) =>
                          this.renderBooking(booking, 'previous', index)
                    )
                  }
                </ul>
              </li>
            </List>
            <DeleteUserDialog
              user={user}
              onClose={(deleted) => this.handleDeleteUserDialogClose(deleted)}
              open={this.state.deleteUserDialogOpened} />
            <UserEditDialog
              user={user}
              onClose={(updated) => this.handleUserUpdateDialogClose(updated)}
              open={this.state.userUpdateDialogOpened} />
          </div>

        );

      } else {

        // an error occurred loading the user
        return (
          <div className='center'>
            <ErrorIcon />
            <Typography variant='h5'>
              {S.userDetailsErrorLoading}
            </Typography>
          </div>
        );

      }

    }

  }

  /**
   * Renders a booking.
   * @param {Object} booking The booking.
   * @param {String} section
   * @param {Number} index
   * @return {*}
   */
  renderBooking(booking, section, index) {

    const date = new Date(booking.date);

    return (
      <ListItem key={`item-${section}-${index}`}>
        <ListItemText
          primary='Lunch - Facility'
          secondary={date.toDateString()} />
      </ListItem>
    );

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    if (this.props.userId &&
      this.props.userId !== this.state.deletedId &&
      this.props.userId !== this.state.updatedId) {

      // we have a userId so we can show the loading and user details
      return (
        <Paper id='user-details'>
          {this.state.loading && <LinearProgress color='primary' />}
          {this.displayUserDetails()}
        </Paper>
      );

    } else {

      // we have no userId so take no action
      return (<div></div>);

    }

  }

}

UserDetails.propTypes = {
  data: PropTypes.object,
  userId: PropTypes.number,
};

export default graphql(getUserDetailsQuery, {
  options: (props) => {

    return {
      variables: {
        id: props.userId,
      },
    };

  },
})(UserDetails);
