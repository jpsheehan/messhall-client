import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {hideSnackbar} from '../../actions';

import PremadeSnackbar from '../../components/PremadeSnackbar';

/**
 * Provides methods for showing PremadeSnackbar components.
 */
class SnackbarProvider extends Component {

  /**
   * Renders the component.
   * @return {JSX}
   */
  render() {

    const {snackbar} = this.props;

    if (snackbar) {

      return (
        <PremadeSnackbar
          open={snackbar.open}
          message={snackbar.message}
          variant={snackbar.variant}
          onClose={() => this.handleSnackbarClose()} />
      );

    } else {

      return (<div></div>);

    }

  }

  /**
   * Called when a Snackbar is closed.
   */
  handleSnackbarClose() {

    const {snackbar} = this.props;

    // dispatch a HIDE_SNACKBAR action to redux
    this.props.hideSnackbar();

    // call the callback if it is valid
    if (snackbar.callback) {

      snackbar.callback(snackbar.message);

    }

  }

}

SnackbarProvider.propTypes = {
  snackbar: PropTypes.object,
  hideSnackbar: PropTypes.func,
};

const mapStateToProps = (state) => {

  return {
    snackbar: state.snackbar,
  };

};

const mapDispatchToProps = {
  hideSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarProvider);
