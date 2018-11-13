import React, {Component} from 'react';

import {
  Grid,
} from '@material-ui/core';

import {
} from '@material-ui/icons';

import FacilityList from '../FacilityList';
import FacilityDetails from '../FacilityDetails';
import './style.css';

/**
 * The ManagerPortal Component shows graphs and other information useful for
 * managers.
 */
class ManagerPortal extends Component {

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <div id='manager-portal'>
        <Grid container direction='row'>
          <Grid item xs={4}>
            <FacilityList />
          </Grid>
          <Grid item xs={8}>
            <FacilityDetails />
          </Grid>
        </Grid>
      </div>
    );

  }

}

export default ManagerPortal;
