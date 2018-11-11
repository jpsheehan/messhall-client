import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PropTypes from 'prop-types';

/**
 * Shows a basic error dialog to the user.
 */
class BasicDialog extends Component {

  /**
   * Creates a new instance of ErrorDialog.
   * @param {Object} props
   */
  constructor(props) {

    super(props);
    this.state = {
      open: false,
    };

  }

  /**
   * Triggers the dialog to close.
   */
  handleClose() {

    this.setState({open: false});
    this.props.onClose();

  }

  /**
   * Triggers the dialog to open.
   */
  handleOpen() {

    this.setState({open: true});

  }

  /**
   * To be run when the component is updated
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {

    if (
      prevProps.title !== this.props.title ||
      prevProps.message !== this.props.message ||
      prevProps.open !== this.props.open) {

      this.setState({
        title: this.props.title || 'Title',
        message: this.props.message || 'Message',
        open: this.props.open || false,
      });

    }

  }

  /**
   * Renders the component.
   * @return {JSX}
   */
  render() {

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby='error-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='error-dialog-title'>
            {this.props.title}
          </DialogTitle>
          <DialogContent id='error-dialog-description'>
            <DialogContentText>
              {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> this.handleClose()} color='primary' autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

  }

}

BasicDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BasicDialog;
