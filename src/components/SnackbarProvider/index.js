import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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

    return this.props.snackbars.map((snackbar, index) => {

      return (
        <PremadeSnackbar
          open={this.props.snackbars[index].open}
          key={index}
          message={snackbar.message}
          variant={snackbar.variant}
          autoHideDuration={null}
          onClose={() => this.handleSnackbarClose(index)} />
      );

    });

  }

  // /**
  //  * Testing
  //  * @param {Object} nextProps
  //  * @return {Boolean}
  //  */
  // shouldComponentUpdate(nextProps) {

  //   console.log(nextProps.snackbars.length, this.props.snackbars.length);

  //   return (nextProps.snackbars.length !== this.props.snackbars.length);

  // }

  /**
   * Called when a Snackbar is closed.
   * @param {Number} index The index of the snackbar to close
   */
  handleSnackbarClose(index) {

    // dispatch a CLOSE action to the redux store
    this.props.dispatch({
      type: 'HIDE_SNACKBAR',
      payload: {index},
    });

  }

}

SnackbarProvider.propTypes = {
  snackbars: PropTypes.array,
  children: PropTypes.node,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {

  return {
    snackbars: state.snackbars,
  };

};

export default connect(mapStateToProps)(SnackbarProvider);
