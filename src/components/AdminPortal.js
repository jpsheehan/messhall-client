import React, {Component} from 'react';

import UserList from './UserList';
import UserDetails from './UserDetails';

/**
 * Provides the user interface for the AdminPortal.
 */
class AdminPortal extends Component {

  /**
   * Creates a new instance of the AdminPortal component.
   * @param {Object} props The props for the component.
   */
  constructor(props) {

    super(props);
    this.state = {
      selected: null,
    };

  }

  /**
   * The callback to be called when a new user is selected.
   * @param {Number} userId The Id of the user that has been selected.
   */
  changeSelectedUser(userId) {

    this.setState({selected: userId});

  }

  /**
   * Renders the UI for the AdminPortal
   * @return {*}
   */
  render() {

    return (

      <div id='admin-portal'>

        <div className='row'>

          <div className="col s4">
            <button
              className="btn waves-effect waves-light white-text grey darken-2">
              New User
              <i className="material-icons right">add</i>
            </button>

            <input type="text" placeholder='Search by name or user #' />

            <UserList callback={(id) => this.changeSelectedUser(id)}/>
          </div>

          <div className="col s8">
            <UserDetails userId={this.state.selected} />
          </div>

        </div>

      </div>

    );

  }

}

export default AdminPortal;
