import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

import {
  ExitToApp as ExitIcon,
  Fastfood as FoodIcon,
} from '@material-ui/icons';

import {deleteTokenMutation} from '../../queries';
import {isLoggedIn} from '../../utils';
import * as S from '../../strings';
import './style.css';

/**
 * The NavBar component is displayed at the top of the page.
 * It shows the logged in user's name and an option to sign out.
 * If the user is not logged in, the NavBar displays nothing.
 */
class NavBar extends Component {

  /**
   * Signs the user out.
   */
  signOut() {

    this.props.deleteTokenMutation({
      variables: {
        id: parseInt(localStorage.getItem('token_id')),
      },
    }).then((_) => {

      // sign the user out locally and redirect to the login screen
      localStorage.clear();
      this.props.history.push('/sign-in');

    }).catch((err) => {

      alert(err);
      console.log(err);

    });

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    if (isLoggedIn()) {

      document.body.classList.remove('background-red');
      return (
        <header>
          <AppBar position='static'>
            <Toolbar className='background-red'>
              <FoodIcon className='logo' />
              <Typography className='grow' color='inherit' variant='h6'>
                {S.brandName}
              </Typography>
              <Typography color='inherit'>
                {localStorage.getItem('user_name')}
              </Typography>
              &nbsp;
              <IconButton color='inherit' onClick={(e) => this.signOut()}>
                <ExitIcon color='inherit' />
              </IconButton>
            </Toolbar>
          </AppBar>
        </header>
      );

    } else {

      document.body.classList.add('background-red');
      return (<div></div>);

    }

  }

}

NavBar.propTypes = {
  deleteTokenMutation: PropTypes.func,
  history: PropTypes.object,
};

export default graphql(deleteTokenMutation, {
  name: 'deleteTokenMutation',
})(NavBar);
