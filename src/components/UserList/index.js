import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';

import {
  Typography,
  Grid,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  LinearProgress,
  TextField,
  Paper,
} from '@material-ui/core';

import {showSnackbar} from '../../actions';
import {userSearchQuery} from '../../queries';
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

    if (!loading) {

      if (error) {

        if (this.state.error === false) {

          // this is a guard so we don't keep firing new snackbars when
          // other state is updated.
          this.setState({
            error: true,
          });

          this.props.showSnackbar(error.toString(), 'error');

        }

      } else {

        if (this.state.error === true) {

          this.setState({
            error: false,
          });

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
                <Typography>
                  {user.name}
                </Typography>
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

    return (<TableRow></TableRow>);

  }

  /**
   * Handles what happens when the search bar value changes.
   * @param {Event} event
   */
  handleSearchSubmit(event) {

    event.preventDefault();

    const searchTerm = document.querySelector('#user-list-search')
        .value
        .toLowerCase();

    this.setState({
      selectedIndex: -1,
      searchTerm,
      error: false,
    });

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <Paper id='user-list'>
        <Query
          query={userSearchQuery}
          variables={{nameOrId: this.state.searchTerm}}>
          {
            ({loading, error, data}) =>

              (<div>
                <Grid container direction='column'>
                  <Grid item>
                    {loading && <LinearProgress color='primary' />}
                  </Grid>
                  <Grid item>
                    <form onSubmit={(ev) => this.handleSearchSubmit(ev)}>
                      <TextField
                        id='user-list-search'
                        label='Search users...'
                        type='search'
                        fullWidth
                        margin='dense'
                        disabled={loading}
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
                    {this.renderTabularData(loading, error, data)}
                  </TableBody>
                </Table>
              </div>)
          }
        </Query>
      </Paper>
    );

  }

}

UserList.propTypes = {
  callback: PropTypes.func,
  showSnackbar: PropTypes.func,
};

const mapDispatchToProps = {
  showSnackbar,
};

export default connect(null, mapDispatchToProps)(UserList);
