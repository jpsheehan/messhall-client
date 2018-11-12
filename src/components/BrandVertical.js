import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import {brandName, brandSlogan} from '../strings';

/**
 * The component representing the vertical brand display.
 * @param {Object} props
 * @return {*}
 */
function BrandVertical(props) {

  return (
    <div>
      <Typography variant='h3' align='center'>
        <Icon className='md-64'>fastfood</Icon>
        <br />
        {brandName}
      </Typography>
      <Typography variant='caption' align='center'>
        {brandSlogan}
      </Typography>
    </div>
  );

}

export default BrandVertical;
