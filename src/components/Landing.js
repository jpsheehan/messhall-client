import React from 'react';
import {Link} from 'react-router-dom';

/**
 * The default landing page
 * @return {*}
 */
function Landing() {

  return (
    <div id='landing'>
      <h1>Appetite</h1>
      <p>
        Welcome, etc.
        <br />
        <Link to='/sign-in'>Sign In</Link>
      </p>
    </div>
  );

}

export default Landing;
