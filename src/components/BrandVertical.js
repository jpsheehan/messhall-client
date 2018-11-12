import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

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
        Appetite
      </Typography>
      <Typography variant='caption' align='center'>
        A new way to have your say
      </Typography>
    </div>
  );

}

export default BrandVertical;
