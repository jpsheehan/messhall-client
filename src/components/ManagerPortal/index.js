import React, {Component} from 'react';

import {
  Typography,
  Grid,
} from '@material-ui/core';

import {
  ThumbDown as ThumbIcon,
} from '@material-ui/icons';

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
        <Grid container direciton='column' justify='center' spacing={0}>
          <Grid item class='center'>
            <ThumbIcon fontSize='large' />
            <Typography variant='h5'>
              This feature has not yet been implemented!
            </Typography>
          </Grid>
        </Grid>
      </div>
    );

  }

}

export default ManagerPortal;
