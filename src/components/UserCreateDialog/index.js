import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import {connect} from 'react-redux';

import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  LinearProgress,
} from '@material-ui/core';

import {
  Send as SendIcon,
} from '@material-ui/icons';

import {showSnackbar} from '../../actions';
import {createUserMutation, getUsersQuery} from '../../queries';
import * as S from '../../strings';
import './style.css';

/**
 * The component for creating new Users
 */
class UserCreateDialog extends Component {

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
      loading: false,
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
      this.props.showSnackbar('The passwords do not match', 'warning');

    } else {

      if (this.state.loading === false) {

        this.setState({loading: true});

      }

      // the passwords match, create the user and refetch the user list
      this.props.createUserMutation({
        variables: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          role: this.state.role,
          email: this.state.email,
          password: this.state.password,
        },
        refetchQueries: [{
          query: getUsersQuery,
        }],
      }).then((user) => {

        // close the dialog
        this.props.showSnackbar('The user was created', 'success');
        this.props.callback(user);

      }).catch((err) => {

        this.setState({loading: false});
        this.props.showSnackbar(err.toString(), 'error');

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

      <div id='create-user' className='spacing'>
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

            <FormControl disabled={this.state.loading}>
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
              style={{marginTop: '1em', marginBottom: '1em'}}
              direction='row'
              justify='flex-end'>
              <Grid item>
                <Button
                  type='submit'
                  variant='outlined'
                  disabled={this.state.loading}>
                  Create User
                  <SendIcon />
                </Button>
              </Grid>
              <Grid item>
                <span style={{marginLeft: 20}}></span>
              </Grid>
              <Grid item>
                <Button
                  type='reset'
                  onClick={
                    (ev) => this.handleResetClick(ev)
                  }
                  disabled={this.state.loading}>
                  Cancel
                </Button>
              </Grid>
            </Grid>

            {this.state.loading && <LinearProgress color='primary' />}
          </form>
        </div>
      </div>

    );

  }

}

UserCreateDialog.propTypes = {
  createUserMutation: PropTypes.any,
  callback: PropTypes.func.isRequired,
  showSnackbar: PropTypes.func,
};

const mapDispatchToProps = {
  showSnackbar,
};

export default connect(null, mapDispatchToProps)(
    compose(
        graphql(createUserMutation, {name: 'createUserMutation'}),
    )(UserCreateDialog)
);
