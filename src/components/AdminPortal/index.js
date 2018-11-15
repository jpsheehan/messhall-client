import React, {Component} from 'react';

import {
  Button,
  Grid,
  Typography,
  Paper,
} from '@material-ui/core';

import {
  Add as AddIcon,
} from '@material-ui/icons';

import UserList from '../UserList';
import UserDetails from '../UserDetails';
import UserCreateDialog from '../UserCreateDialog';
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
      createUserDialogShown: false,
    };

  }

  /**
   * Handles the CreateUser Dialog close event.
   * @param {Object} user
   */
  handleCreateUserDialogClose(user) {

    if (this.state.createUserDialogShown === true) {

      this.setState({createUserDialogShown: false});

    }

  }

  /**
   * Handles the button event for Create User.
   * @param {Event} event
   */
  handleCreateUserButtonClick(event) {

    this.setState({createUserDialogShown: true});

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
        <Grid container direction='row' justify='space-between'>
          <Grid item container xs={4} direction='column'>
            <Grid item>
              <Paper style={{margin: '1em', padding: '1em'}}>
                <Typography variant='h6'>
                  Administrator Tools:
                </Typography>
                <Button onClick={(ev) => this.handleCreateUserButtonClick(ev)}>
                  New User
                  <AddIcon />
                </Button>
              </Paper>
            </Grid>
            <Grid item>
              <UserList callback={(id) => this.changeSelectedUser(id)}/>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <UserDetails userId={this.state.selected} />
          </Grid>
        </Grid>
        <UserCreateDialog
          open={this.state.createUserDialogShown}
          onClose={(ev) => this.handleCreateUserDialogClose(ev)} />

      </div>

    );

  }

}

export default AdminPortal;
