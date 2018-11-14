import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';

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

import {userSearchQuery} from '../../queries';
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
      error: false,
      searchTerm: '',
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
   * @param {Boolean} loading
   * @param {Object} error
   * @param {Object} data
   * @return {*}
   */
  renderTabularData(loading, error, data) {

    if (loading) {

      if (this.state.loading === false) {

        this.setState({loading: true});

      }

    } else {

      if (this.state.loading === true) {

        this.setState({loading: false});

      }

      if (error) {

        if (this.state.error === false) {

          this.setState({error: true});

        }

      } else {

        if (this.state.error === true) {

          this.setState({error: false});

        }

        const users = data.userSearch;

        return users.map((user, index) => {

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

      }

    }

    return (<div></div>);

  }

  /**
   * Handles what happens when the search bar value changes.
   * @param {Event} event
   */
  handleSearchChange(event) {

    event.preventDefault();

    const searchTerm = document.querySelector('#user-list-search')
        .value
        .toLowerCase();

    this.setState({
      selectedIndex: -1,
      searchTerm,
    });

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
            <Query
              query={userSearchQuery}
              variables={{nameOrId: this.state.searchTerm}}>
              {
                ({loading, error, data}) =>
                  this.renderTabularData(loading, error, data)
              }
            </Query>
          </TableBody>
        </Table>
      </Paper>
    );

  }

}

UserList.propTypes = {
  callback: PropTypes.func,
};

export default UserList;
