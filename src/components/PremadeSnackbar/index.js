import React from 'react';
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

// the default timeout in milliseconds
const DEFAULT_TIMEOUT = 6000;

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
 * @param {Object} props
 * @return {JSX}
 */
function PremadeSnackbar(props) {

  const icon = variantIcons[props.variant];
  const style = {backgroundColor: variantColors[props.variant]};

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.open}
      autoHideDuration={props.autoHideDuration || DEFAULT_TIMEOUT}
      onClose={() => props.onClose()}>
      <SnackbarContent
        aria-describedby='client-snackbar'
        style={style}
        message={
          <span
            id='client-snackbar'
            style={{display: 'flex', alignItems: 'center'}}>
            {icon}
            {props.message}
          </span>}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            onClick={() => props.onClose()}>
            <CloseIcon />
          </IconButton>,
        ]}/>
    </Snackbar>
  );

}

PremadeSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf([
    'success',
    'warning',
    'error',
    'info']).isRequired,
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
};

export default PremadeSnackbar;
