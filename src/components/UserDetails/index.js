import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import BookIcon from '@material-ui/icons/Book';
import ErrorIcon from '@material-ui/icons/Error';
import EditIcon from '@material-ui/icons/Edit';

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
    };

  }

  /**
   * Displays the details about the particular user.
   * @return {*}
   */
  displayUserDetails() {

    const data = this.props.data;

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
          <Paper id='user-details'>
            <Grid container direction='column'>
              <Grid item container direction='row' justify='space-between'>
                <Grid item>
                  <Typography variant='h4'>
                    {user.lastName}, {user.firstName}
                  </Typography>
                </Grid>
                <Grid item container direction='row' justify='flex-end'>
                  <Grid item>
                    <Button variant='contained'>
                      Edit
                      <EditIcon />
                    </Button>
                  </Grid>
                  <Grid item><span className='space-right'></span></Grid>
                  <Grid item>
                    <Button variant='contained'>
                      Manage Bookings
                      <BookIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}><div className='margin-1em'></div></Grid>
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
              </Grid>
            </Grid>

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
          </Paper>

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

    console.log(this.props);

    if (this.props.userId) {

      // we have a userId so we can show the loading and user details
      return (
        <div id='user-details'>
          {this.state.loading && <LinearProgress color='primary' />}
          {this.displayUserDetails()}
        </div>
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
