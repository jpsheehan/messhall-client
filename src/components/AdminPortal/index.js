import React, {Component} from 'react';

import {
  Button,
  Grid,
} from '@material-ui/core';

import {
  Add as AddIcon,
} from '@material-ui/icons';

import UserList from '../UserList';
import UserDetails from '../UserDetails';
import './style.css';

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
        <Grid container direction='row'>
          <Grid item container xs={4} direction='column'>
            <Grid item>
              <Button>
                New User
                <AddIcon />
              </Button>
            </Grid>
            <Grid item>
              <UserList callback={(id) => this.changeSelectedUser(id)}/>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <UserDetails userId={this.state.selected} />
          </Grid>
        </Grid>
      </div>

    );

  }

}

export default AdminPortal;
