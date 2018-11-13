import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import {
  deleteUserMutation,
  getUsersQuery,
} from '../../queries';

/**
 * The DeleteUserDialog allows an admin to remove a user from the system.
 */
class DeleteUserDialog extends Component {

  /**
   * Creates a new instance of DeleteUserDialog.
   * @param {Object} props
   */
  constructor(props) {

    super(props);
    this.state = {
      loading: false,
    };

  }

  /**
   * Handles the delete button click event.
   */
  handleDelete() {

    this.setState({loading: true});

    this.props.deleteUserMutation({
      variables: {
        id: this.props.user.id,
      },
      refetchQueries: {
        query: getUsersQuery,
      },
    }).then((user) => {

      this.handleClose(true);

    }).catch((err) => {

      this.alert('An error occurred.');
      console.error(err);

    }).finally(() => {

      this.setState({loading: false});

    });

  }

  /**
   * Handles the cancel button click event.
   * @param {Boolean} deleted
   */
  handleClose(deleted) {

    this.props.onClose(deleted || false);

  }

  /**
   * Renders the component.
   * @return {JSX}
   */
  render() {

    const {user} = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          disableBackdropClick={this.state.loading}
          disableEscapeKeyDown={this.state.loading}>
          <div className='spacing'>
            <DialogTitle>
              Delete User
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the following user?<br />
                <b>This action is permanent and irreversible.</b>
                <br /><br />
                ID: {user.id}<br />
                Name: {user.name}<br />
                Email: {user.email}<br />
                Role: {user.role}<br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => this.handleDelete()}
                disabled={this.state.loading}>
                Delete
              </Button>
              <Button
                onClick={() => this.handleClose()}
                autoFocus
                disabled={this.state.loading}>
                Cancel
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        <Dialog
          open={this.state.loading}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}>
          <CircularProgress
            color='secondary'
            className='spacing' />
        </Dialog>
      </div>
    );

  }

}

DeleteUserDialog.propTypes = {
  user: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteUserMutation: PropTypes.func,
};

export default graphql(deleteUserMutation, {
  name: 'deleteUserMutation',
})(DeleteUserDialog);
