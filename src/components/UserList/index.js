import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {
  Grid,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  LinearProgress,
  TextField,
  Typography,
  Paper,
} from '@material-ui/core';

import {
  Error as ErrorIcon,
} from '@material-ui/icons';

import {getUsersQuery} from '../../queries';
import * as S from '../../strings';
import './style.css';

/**
 * Displays a list of registered users
 */
class UserList extends Component {

  /**
   * Create a new UserList component
   * @param {Object} props The props for this component.
   */
  constructor(props) {

    super(props);
    this.state = {
      selectedIndex: -1,
      loading: false,
      searchTerm: [],
    };

  }

  /**
   * Handles the click event for a ListItem.
   * @param {Event} event The click event.
   * @param {Number} index The index of the list item.
   * @param {Object} user The user that has been selected.
   */
  handleListItemClick(event, index, user) {

    this.setState({selectedIndex: index});
    this.props.callback(user.id);

  }

  /**
   * Renders the list of users
   * @return {*}
   */
  renderListItems() {

    const data = this.props.data;

    if (data.loading === false) {

      // data has finished loading and is ready
      if (this.state.loading === true) {

        this.setState({loading: false});

      }

      if (data.users && data.users.length > 0) {

        // data was loaded ok
        return data.users.filter((user) => {

          // use the search term to filter out users
          if (!this.state.searchTerm) {

            // if there is no search term, then we want all data
            return true;

          } else {

            if (
              user.name.toLowerCase().indexOf(this.state.searchTerm) > -1 ||
              this.state.searchTerm === user.id.toString().toLowerCase()
            ) {

              return true;

            } else {

              return false;

            }

          }

        }).map((user, index) => {

          const numCurrentBookings = user.history.reduce((sum, booking) => {

            const date = new Date(booking.date);
            return sum
                + (date >= Date.now() && booking.type === 'attendance' ? 1 : 0);

          }, 0);
          const numTotalBookings = user.history.reduce((sum, booking) => {

            return sum + (booking.type === 'attendance' ? 1 : 0);

          }, 0);

          return (
            <TableRow
              key={index}
              selected={this.state.selectedIndex === index}
              onClick={(ev) => this.handleListItemClick(ev, index, user)}>
              <TableCell>
                {user.name}
              </TableCell>
              <TableCell>
                {user.id}
              </TableCell>
              <TableCell>
                {numCurrentBookings}
              </TableCell>
              <TableCell>
                {numTotalBookings}
              </TableCell>
            </TableRow>
          );

        });

      } else {

        // data could not load
        return (
          <TableRow>
            <TableCell colSpan={4}>
              <ErrorIcon />
              <Typography>
                {S.userListErrorLoading}
              </Typography>
            </TableCell>
          </TableRow>
        );

      }

    } else {

      // data is loading
      if (this.state.loading === false) {

        this.setState({loading: true});
        return (
          <TableRow>
            <TableCell colSpan={4}></TableCell>
          </TableRow>
        );

      }

    }

  }

  /**
   * Handles what happens when the search bar value changes.
   * @param {Event} event
   */
  handleSearchChange(event) {

    event.preventDefault();

    const term = document.querySelector('#user-list-search').value;
    this.setState({searchTerm: term.toLowerCase()});

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <Paper id='user-list'>
        <Grid container direction='column'>
          <Grid item>
            {this.state.loading && <LinearProgress color='primary' />}
          </Grid>
          <Grid item>
            <form onSubmit={(ev) => this.handleSearchChange(ev)}>
              <TextField
                id='user-list-search'
                label='Search users...'
                type='search'
                fullWidth
                margin='dense'
                disabled={this.state.loading}
                autoFocus />
            </form>
          </Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                ID
              </TableCell>
              <TableCell>
                Current Bookings
              </TableCell>
              <TableCell>
                Total Bookings
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderListItems()}
          </TableBody>
        </Table>
      </Paper>
    );

  }

}

UserList.propTypes = {
  data: PropTypes.object,
  callback: PropTypes.func,
};

export default graphql(getUsersQuery)(UserList);
