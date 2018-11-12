import React from 'react';
import {Redirect} from 'react-router-dom';

import {isLoggedIn} from '../../utils';

/**
 * The default landing page
 * @return {*}
 */
function Landing() {

  if (isLoggedIn()) {

    return (<Redirect to={'/' + localStorage.getItem('user_role')} />);

  } else {

    return (<Redirect to='/sign-in' />);

  }

}

export default Landing;
