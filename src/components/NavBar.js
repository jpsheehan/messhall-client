import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import {deleteTokenMutation} from '../queries';
import {isLoggedIn} from '../utils';

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

      document.body.classList.remove('red', 'darken-3');
      return (
        <header>
          <nav className='red darken-3'>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">
                <i className="material-icons">fastfood</i>
                Appetite
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><b>{localStorage.getItem('user_name')}</b></li>
                <li>
                  <a href='#!' onClick={(e) => this.signOut()}>
                    <i className="material-icons">exit_to_app</i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      );

    } else {

      document.body.classList.add('red', 'darken-3');
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
