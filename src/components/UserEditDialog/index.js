import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import {connect} from 'react-redux';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
} from '@material-ui/core';

import {
  Save as SaveIcon,
} from '@material-ui/icons';

import {showSnackbar} from '../../actions';
import {
  editUserMutation,
  userSearchQuery,
  getUserDetailsQuery,
} from '../../queries';
import * as S from '../../strings';
import './style.css';

/**
 * The component for creating new Users
 */
class UserEditDialog extends Component {

  /**
   * Creates a new CreateUser component
   * @param {Object} props The properties of the component
   */
  constructor(props) {

    super(props);
    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      role: props.user.role,
      email: props.user.email,
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
      this.props.showSnackbar('The passwords do not match.', 'warning');

    } else {

      if (this.state.loading === false) {

        this.setState({loading: true});

      }

      let patch = {};

      if (this.state.firstName !== this.props.user.firstName) {

        patch = {
          ...patch,
          firstName: this.state.firstName,
        };

      }

      if (this.state.lastName !== this.props.user.lastName) {

        patch = {
          ...patch,
          lastName: this.state.lastName,
        };

      }

      if (this.state.email !== this.props.user.email) {

        patch = {
          ...patch,
          email: this.state.email,
        };

      }

      if (this.state.role !== this.props.user.role) {

        patch = {
          ...patch,
          role: this.state.role,
        };

      }

      if (this.state.password) {

        patch = {
          ...patch,
          password: this.state.password,
        };

      }

      // the passwords match, create the user and refetch the user list
      this.props.editUserMutation({
        variables: {
          id: this.props.user.id,
          patch,
        },
        refetchQueries: [{
          query: userSearchQuery,
          variables: {
            nameOrId: this.props.searchTerm,
          },
        },
        {
          query: getUserDetailsQuery,
          variables: {
            id: this.props.user.id,
          },
        }],
      }).then((user) => {

        // close the dialog
        this.props.showSnackbar('The user was updated', 'success');
        this.props.onClose(user);

      }).catch((err) => {

        this.props.showSnackbar(err.toString(), 'error');
        console.log(err);

      }).finally(() => {

        this.setState({loading: false});

      });

    }

  }

  /**
   * Handles the dialog close event.
   * @param {Object} user
   */
  handleClose(user) {

    this.props.onClose(user || null);

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.handleClose()}>
          <DialogTitle>
            Edit Existing User
          </DialogTitle>
          <form onSubmit={this.submitForm.bind(this)}>
            <div id='create-user' className='spacing'>
              <DialogContent>

                <TextField
                  id='create-user-first-name'
                  label='First Name'
                  type='text'
                  value={this.state.firstName}
                  placeholder={S.placeholderFirstName}
                  onChange={(e) => this.setState({firstName: e.target.value})}
                  disabled={this.state.loading} />

                <TextField
                  id='create-user-last-name'
                  label='Last Name'
                  type='text'
                  value={this.state.lastName}
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
                  value={this.state.email}
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
                  max={128}
                  onChange={(e) => this.setState({password: e.target.value})}
                  disabled={this.state.loading} />

                <TextField
                  id='create-user-password-repeat'
                  label='Repeat Password'
                  type='password'
                  fullWidth
                  min={8}
                  max={128}
                  onChange={
                    (e) => this.setState({passwordRepeat: e.target.value})
                  }
                  disabled={this.state.loading} />
              </DialogContent>
              <DialogActions>
                <Button
                  type='submit'
                  variant='outlined'
                  disabled={this.state.loading}>
                  Save Changes
                  <SaveIcon />
                </Button>
                <Button
                  type='reset'
                  onClick={() => this.handleClose(false)}
                  disabled={this.state.loading}>
                  Cancel
                </Button>
              </DialogActions>
            </div>
          </form>
        </Dialog>
        <Dialog
          open={this.state.loading}>
          <CircularProgress className='spacing' />
        </Dialog>
      </div>
    );

  }

}

UserEditDialog.propTypes = {
  editUserMutation: PropTypes.func,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  searchTerm: PropTypes.string,
  showSnackbar: PropTypes.func,
};

const mapDispatchToProps = {
  showSnackbar,
};

const mapStateToProps = (state) => {

  return {
    searchTerm: state.search.term,
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(
    compose(
        graphql(editUserMutation, {name: 'editUserMutation'}),
    )(UserEditDialog)
);
