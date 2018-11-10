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

        return (
          <li onClick={(e) => this.setState({selected: user.id})}
            key={user.id}>{user.name} ({user.email}, {user.role})</li>
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
        <ul id='user-list'>
          {this.displayUsers()}
        </ul>

        <UserDetails userId={this.state.selected} />
      </div>
    );

  }

}

UserList.propTypes = {
  data: PropTypes.object,
};

export default graphql(getUsersQuery)(UserList);
