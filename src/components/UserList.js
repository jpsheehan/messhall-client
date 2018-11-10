import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {getUsersQuery} from '../queries';

import UserDetails from './UserDetails';

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
      selected: null,
    };

  }

  /**
   * Renders the list of users
   * @return {*}
   */
  displayUsers() {

    const data = this.props.data;

    if (data.loading) {

      // data is not ready
      return (<div>Loading users...</div>);

    } else {

      // data is ready
      return data.users.map((user) => {

        const numCurrentBookings = user.history.reduce((sum, booking) => {

          const date = new Date(booking.date);
          return sum
              + (date >= Date.now() && booking.type === 'attendance') ? 1 : 0;

        }, 0);
        const numTotalBookings = user.history.reduce((sum, booking) => {

          return sum + (booking.type === 'attendance') ? 1 : 0;

        }, 0);

        return (
          <tr onClick={(e) => this.setState({selected: user.id})} key={user.id}>
            <td>
              {user.name}<br />
              {user.id}
            </td>
            <td>
              {numCurrentBookings}
            </td>
            <td>
              {numTotalBookings}
            </td>
          </tr>
        );

      });

    }

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <div>
        <table className='striped'>
          <thead>
            <tr>
              <th>User</th>
              <th>Current Bookings</th>
              <th>Total Bookings</th>
            </tr>
          </thead>
          <tbody>
            {this.displayUsers()}
          </tbody>
        </table>

        <UserDetails userId={this.state.selected} />
      </div>
    );

  }

}

UserList.propTypes = {
  data: PropTypes.object,
};

export default graphql(getUsersQuery)(UserList);
