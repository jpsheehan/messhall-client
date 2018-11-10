import React, {Component} from 'react';

/**
 * The NavBar component is displayed at the top of the page.
 * It shows the logged in user's name and an option to sign out.
 */
class NavBar extends Component {

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    let navbarContents = '';

    if (localStorage.getItem('token') && localStorage.getItem('name')) {

      navbarContents = (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><b>{localStorage.getItem('name')}</b></li>
          <li>
            <a href='#!'>
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

export default NavBar;
