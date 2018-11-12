import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {getUsersQuery} from '../../queries';

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
      return (
        <tr>
          <td colSpan='3' className='center-align'>
            <div className="preloader-wrapper active">
              <div className="spinner-layer spinner-red-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      );

    } else {

      // data is ready
      if (data.users) {

        return data.users.map((user) => {

          const numCurrentBookings = user.history.reduce((sum, booking) => {

            const date = new Date(booking.date);
            return sum
                + (date >= Date.now() && booking.type === 'attendance' ? 1 : 0);

          }, 0);
          const numTotalBookings = user.history.reduce((sum, booking) => {

            return sum + (booking.type === 'attendance' ? 1 : 0);

          }, 0);

          return (
            <tr href='#!'
              onClick={(e) => this.props.callback(user.id)} key={user.id}>
              <td>
                <b>{user.name}</b>
                <br />
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
      
      } else {

        return (<tr><td colSpan='3'></td></tr>);

      }

    }

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <div>
        <table className='highlight'>
          <thead>
            <tr className='grey lighten-3'>
              <th>User</th>
              <th>Current Bookings</th>
              <th>Total Bookings</th>
            </tr>
          </thead>
          <tbody>
            {this.displayUsers()}
          </tbody>
        </table>
      </div>
    );

  }

}

UserList.propTypes = {
  data: PropTypes.object,
  callback: PropTypes.func,
};

export default graphql(getUsersQuery)(UserList);
