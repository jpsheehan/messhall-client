import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import {getUserDetailsQuery} from '../../queries';

/**
 * Displays details about a specific user.
 */
class UserDetails extends Component {

  /**
   * Displays the details about the particular user.
   * @return {*}
   */
  displayUserDetails() {

    const data = this.props.data;

    if (data.loading) {

      // data is not ready
      return (
        <div className="align-center valign-wrapper">
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
        </div>
      );

    } else {

      if (data.user) {

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
            <div className='section'>
              <div className="right">
                <button className='btn right waves-effect waves-light white text-darken-3 red-text'>
                  Edit
                  <i className="material-icons right">edit</i>
                </button>
                &nbsp;
                <button className='btn left waves-effect waves-light white text-darken-3 red-text'>
                  Manage Bookings
                  <i className="material-icons right">book</i>
                </button>
              </div>

              <div className="user-details-name">
                <h4>{user.lastName}, {user.firstName}</h4>
              </div>
              <div className="user-details-id">
                <h5>{user.id}</h5>
              </div>
            </div>

            <div className="section">
              <table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.phone ? 'tel:' + user.phone : 'N/A'}</td>
                    <td>
                      <a href={'mailto:' + user.email}>{user.email}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section">
              <ul className="collection with-header">
                <li className="collection-header">
                  <h6>Current Bookings</h6>
                </li>
                {currentBookings.map(this.displayBooking)}
              </ul>
            </div>

            <div className="section">
              <ul className="collection with-header">
                <li className="collection-header">
                  <h6>Previous Bookings</h6>
                </li>
                {previousBookings.map(this.displayBooking)}
              </ul>
            </div>
          </div>

        );

      } else {

        // no user selected
        return (<div></div>);

      }

    }

  }

  /**
   * Renders a booking.
   * @param {Object} booking The booking.
   * @return {*}
   */
  displayBooking(booking) {

    const date = new Date(booking.date);

    return (
      <li className='booking collection-item'>
        <p>Lunch - Facility</p>
        <p>{date.toDateString()}</p>
      </li>
    );

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    console.log(this.props);

    return (

      <div id="user-details" className='grey lighten-3'>

        {this.displayUserDetails()}

      </div>

    );

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