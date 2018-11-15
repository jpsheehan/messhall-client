import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';

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
  userSearchQuery,
} from '../../queries';
import {showSnackbar} from '../../actions';

/**
 * The UserDeleteDialog allows an admin to remove a user from the system.
 */
class UserDeleteDialog extends Component {

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
      refetchQueries: [{
        query: userSearchQuery,
        variables: {
          nameOrId: this.props.searchTerm,
        },
      }],
    }).then((user) => {

      this.handleClose(true);

    }).catch((err) => {

      this.props.showSnackbar(err.toString(), 'error');
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

    if (deleted) {

      this.props.showSnackbar('The user has been deleted', 'success');

    }

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

UserDeleteDialog.propTypes = {
  user: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  deleteUserMutation: PropTypes.func,
  showSnackbar: PropTypes.func,
  searchTerm: PropTypes.string,
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
    graphql(deleteUserMutation, {
      name: 'deleteUserMutation',
    })(UserDeleteDialog)
);
