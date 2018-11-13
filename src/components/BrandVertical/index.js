import React from 'react';
import Typography from '@material-ui/core/Typography';
import FoodIcon from '@material-ui/icons/Fastfood';

import * as S from '../../strings';

/**
 * The component representing the vertical brand display.
 * @param {Object} props
 * @return {*}
 */
function BrandVertical(props) {

  return (
    <div>
      <Typography variant='h3' align='center'>
        <FoodIcon fontSize='large' />
        <br />
        {S.brandName}
      </Typography>
      <Typography variant='caption' align='center'>
        {S.brandSlogan}
      </Typography>
    </div>
  );

}

export default BrandVertical;
