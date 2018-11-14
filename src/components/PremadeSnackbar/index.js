import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';

import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
} from '@material-ui/icons';

import {
  green,
  amber,
  blue,
  red,
} from '@material-ui/core/colors';

const variantIcons = {
  success: (<CheckCircleIcon />),
  warning: (<WarningIcon />),
  error: (<ErrorIcon />),
  info: (<InfoIcon />),
};

const variantColors = {
  success: green[600],
  warning: amber[700],
  error: red[700],
  info: blue[500],
};

/**
 * Creates a Snackbar in the bottom left corner of the screen with a
 * specified message and color.
 */
class PremadeSnackbar extends Component {

  /**
  * Creates a new PremadeSnackbar
  * @param {Object} props
  */
  constructor(props) {

    super(props);

  }

  /**
   * Renders the component.
   * @return {JSX}
   */
  render() {

    const icon = variantIcons[this.props.variant];
    const style = {backgroundColor: variantColors[this.props.variant]};

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.props.open}
        autoHideDuration={this.props.autoHideDuration || 6000}
        onClose={() => this.props.onClose()}>
        <SnackbarContent
          aria-describedby='client-snackbar'
          style={style}
          message={
            <span
              id='client-snackbar'
              style={{display: 'flex', alignItems: 'center'}}>
              {icon}
              {this.props.message}
            </span>}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={() => this.props.onClose()}>
              <CloseIcon />
            </IconButton>,
          ]}/>
      </Snackbar>
    );

  }

};

PremadeSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
};

export default PremadeSnackbar;
