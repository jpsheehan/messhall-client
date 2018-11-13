import React, {Component} from 'react';

import {
  LinearProgress,
  Paper,
} from '@material-ui/core';

/**
 * The FacilityDetails component displays information to a manager about the
 * state of a particular facility.
 */
class FacilityDetails extends Component {

  /**
   * Creates a new instance of FacilityDetails.
   * @param {Object} props The component's props.
   */
  constructor(props) {

    super(props);
    this.state = {
      loading: false,
    };

  }

  /**
   * Renders the component.
   * @return {JSX}
   */
  render() {

    return (
      <Paper id='facility-details' className='spacing'>
        {this.state.loading && <LinearProgress />}
      </Paper>
    );

  }

}

export default FacilityDetails;
