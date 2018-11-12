import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BasicDialog from '../BasicDialog';
import * as S from '../../strings';

/**
 * ...
 */
class DialogContainer extends Component {

  /**
   * Creates a new instance of ComponentWithDialog.
   * @param {Object} props The component props.
   */
  constructor(props) {

    super(props);
    this.state = {
      dialogTitle: '',
      dialogMessage: '',
      dialogShown: false,
      dialogCallback: null,
    };

  }

  /**
   * To be called by the close button of the BasicDialog component.
   */
  onDialogClose() {

    this.setState({dialogShown: false});

    // call the callback if it has been set
    if (this.state.dialogCallback) {

      this.state.dialogCallback({
        title: this.state.dialogTitle,
        message: this.state.dialogMessage,
      });

    }

  }

  /**
   * Shows an error to the user. This error is defined in the strings.js file.
   * @param {String} error The type of error to display.
   * @param {Function} callback The function to be called when the dialog is
   * closed.
   */
  showError(error, callback) {

    const {title, message} = S.errors[error];
    this.showMessage(title, message, callback);

  }

  /**
   * Shows a message to the user.
   * @param {String} title The title to display.
   * @param {String} message The message to display.
   * @param {Function} callback The function to be called when the dialog is
   * closed.
   */
  showMessage(title, message, callback) {

    this.setState({
      dialogTitle: title,
      dialogMessage: message,
      dialogCallback: callback,
      dialogShown: true,
    });

  }

  /**
   * Renders the component.
   * @return {JSX}
   */
  render() {

    return (
      <div>
        {this.props.children}
        <BasicDialog
          title={this.state.dialogTitle}
          message={this.state.dialogMessage}
          open={this.state.dialogShown}
          onClose={() => this.onDialogClose()} />
      </div>
    );

  }

}

DialogContainer.propTypes = {
  children: PropTypes.any,
};

export default DialogContainer;
