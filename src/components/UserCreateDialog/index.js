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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@material-ui/core';

import {
  Send as SendIcon,
} from '@material-ui/icons';

import {showSnackbar} from '../../actions';
import {createUserMutation, userSearchQuery} from '../../queries';
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
          query: userSearchQuery,
        }],
      }).then((user) => {

        // close the dialog
        this.props.showSnackbar('The user was created', 'success');
        this.props.onClose(user);

      }).catch((err) => {

        this.props.showSnackbar(err.toString(), 'error');

      }).finally(() => {

        this.setState({loading: false});

      });

    }

  }

  /**
   * Called when the reset button is clicked.
   * @param {Event} event
   */
  handleResetClick(event) {

    this.props.onClose(null);

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <Dialog
        open={this.props.open}>
        <DialogTitle id='create-user-dialog-title'>
          Create New User
        </DialogTitle>
        <DialogContent id='create-user' className='spacing'>
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
              onChange={
                (e) => this.setState({passwordRepeat: e.target.value})}
              disabled={this.state.loading} />

            {this.state.loading && <LinearProgress color='primary' />}
            <DialogActions>
              <Button
                type='submit'
                variant='outlined'
                disabled={this.state.loading}>
                Create User
                <SendIcon />
              </Button>
              <Button
                type='reset'
                onClick={
                  (ev) => this.handleResetClick(ev)
                }
                disabled={this.state.loading}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    );

  }

}

UserCreateDialog.propTypes = {
  createUserMutation: PropTypes.any,
  showSnackbar: PropTypes.func,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  showSnackbar,
};

export default connect(null, mapDispatchToProps)(
    compose(
        graphql(createUserMutation, {name: 'createUserMutation'}),
    )(UserCreateDialog)
);
