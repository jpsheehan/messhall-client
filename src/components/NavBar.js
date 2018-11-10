import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import PropTypes from 'prop-types';

import {deleteTokenMutation} from '../queries';

/**
 * The NavBar component is displayed at the top of the page.
 * It shows the logged in user's name and an option to sign out.
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
    }).then(({data}) => {

      localStorage.clear();
      // TODO: Make this better!
      window.location.reload();

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

    let navbarContents = '';

    if (localStorage.getItem('token') && localStorage.getItem('user_name')) {

      navbarContents = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><b>{localStorage.getItem('user_name')}</b></li>
          <li>
            <a href='#!' onClick={(e) => this.signOut()}>
              <i className="material-icons">exit_to_app</i>
            </a>
          </li>
        </ul>
      );

    }

    return (
      <nav className='red darken-3'>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">
            <i className="material-icons">fastfood</i>
            Appetite
          </a>
          {navbarContents}
        </div>
      </nav>
    );

  }

}

NavBar.propTypes = {
  deleteTokenMutation: PropTypes.function,
};

export default graphql(deleteTokenMutation, {
  name: 'deleteTokenMutation',
})(NavBar);
