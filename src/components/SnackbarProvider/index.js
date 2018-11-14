import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {hideSnackbar} from '../../actions';

import PremadeSnackbar from '../PremadeSnackbar';

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

    // dispatch a CLOSE action to the redux store
    this.props.hideSnackbar();

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
