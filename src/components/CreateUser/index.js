import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
} from '@material-ui/core';

import {
  Send as SendIcon,
} from '@material-ui/icons';

import {createUserMutation, getUsersQuery} from '../../queries';
import * as S from '../../strings';
import './style.css';

/**
 * The component for creating new Users
 */
class CreateUser extends Component {

  /**
   * Creates a new CreateUser component
   * @param {Object} props The properties of the component
   */
  constructor(props) {

    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      role: 'user',
      email: '',
      password: '',
      passwordRepeat: '',
    };

  }

  /**
   * The callback when the submit button is pressed.
   * @param {Event} event The browser event.
   */
  submitForm(event) {

    event.preventDefault();

    if (this.state.password !== this.state.passwordRepeat) {

      // the passwords do not match!
      alert('The passwords must match!');

    } else {

      // the passwords match, create the user and refetch the user list
      this.props.createUserMutation({
        variables: this.state,
        refetchQueries: [{
          query: getUsersQuery,
        }],
      }).then((user) => {

        this.props.callback(user);

      }).catch((err) => {

        alert('error');
        console.log(err);

      });

    }

  }

  /**
   * Called when the reset button is clicked.
   * @param {Event} event
   */
  handleResetClick(event) {

    this.props.callback();

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (

      <div id='create-user'>
        <div>
          <form onSubmit={this.submitForm.bind(this)}>

            <TextField
              id='create-user-first-name'
              label='First Name'
              type='text'
              placeholder={S.placeholderFirstName}
              onChange={(e) => this.setState({firstName: e.target.value})}
              disabled={this.state.loading} />

            <TextField
              id='create-user-last-name'
              label='Last Name'
              type='text'
              placeholder={S.placeholderLastName}
              onChange={(e) => this.setState({lastName: e.target.value})}
              disabled={this.state.loading} />

            <FormControl>
              <InputLabel htmlFor="create-user-role">Role</InputLabel>
              <Select
                value={this.state.role}
                onChange={(e) => this.setState({role: e.target.value})}>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="admin">Administator</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id='create-user-email'
              label='Email'
              type='email'
              fullWidth
              placeholder={S.placeholderEmail}
              onChange={(e) => this.setState({email: e.target.value})}
              disabled={this.state.loading} />

            <TextField
              id='create-user-password'
              label='Password'
              type='password'
              fullWidth
              min={8}
              max={32}
              onChange={(e) => this.setState({password: e.target.value})}
              disabled={this.state.loading} />

            <TextField
              id='create-user-password-repeat'
              label='Repeat Password'
              type='password'
              fullWidth
              min={8}
              max={32}
              onChange={(e) => this.setState({passwordRepeat: e.target.value})}
              disabled={this.state.loading} />

            <Grid container
              style={{marginTop: '1em'}}
              direction='row'
              justify='flex-end'>
              <Grid item>
                <Button type='submit' variant='outlined'>
                  Create User
                  <SendIcon />
                </Button>
              </Grid>
              <Grid item>
                <Button type='reset' onClick={
                  (ev) => this.handleResetClick(ev)
                }>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>

    );

  }

}

CreateUser.propTypes = {
  createUserMutation: PropTypes.any,
  callback: PropTypes.func.isRequired,
};

export default compose(
    graphql(createUserMutation, {name: 'createUserMutation'}),
)(CreateUser);
