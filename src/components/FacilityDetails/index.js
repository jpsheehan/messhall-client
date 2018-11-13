import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import {graphql} from 'react-apollo';

import {
  LinearProgress,
  Paper,
  Typography,
} from '@material-ui/core';

import {
  Error as ErrorIcon,
} from '@material-ui/icons';

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
        <Typography className='center' variant='h5'>
          <ErrorIcon fontSize='large' /><br />
          There was an error loading the data
        </Typography>
      </Paper>
    );

  }

}

export default FacilityDetails;
