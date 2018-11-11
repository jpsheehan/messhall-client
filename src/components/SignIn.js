import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {createTokenMutation} from '../queries';
import {graphql, compose} from 'react-apollo';

/**
 * The component for signing a user in to the admin panel.
 */
class SignIn extends Component {

  /**
   * Creates a new SignIn component.
   * @param {Object} props The properties of this component.
   */
  constructor(props) {

    super(props);
    this.state = {
      email: '',
      password: '',
    };

  }

  /**
   * Helps the user reset their password.
   * @param {Event} event The event passed from the DOM
   */
  forgotPassword(event) {

    alert('Too bad!');

  }

  /**
   * Called when the user clicks the submit button.
   * @param {Event} event The event object.
   */
  signIn(event) {

    event.preventDefault();

    this.props.createTokenMutation({
      variables: this.state,
    }).then(({data}) => {

      try {

        const authToken = data.createSuperToken.authToken;
        const token = data.createSuperToken.token;
        const user = data.createSuperToken.user;

        if (user.role === 'manager' || user.role === 'admin') {

          localStorage.setItem('token', authToken);
          localStorage.setItem('token_id', token.id);
          localStorage.setItem('user_name', user.name);
          localStorage.setItem('user_id', user.id);
          localStorage.setItem('user_role', user.role);

          // TODO: replace this with proper react routing
          window.location.reload();

        } else {

          alert('Users cannot sign in to the admin panel!');

        }

      } catch (err) {

        alert(err);

      }

    }).catch((err) => {

      alert(err.message);

    });

  }

  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <div className='row'>
        <div id='sign-in' className='col s4 offset-s4 white'>
          <div className="center-align">
            <i className="material-icons md-64">fastfood</i><br />
            <h3>Appetite</h3>
            <i>A new way to have your say</i>
          </div>

          <div>
            <form>

              <div className="input-field">
                <label htmlFor='sign-in-email'>Email:</label>
                <input id='sign-in-email' type='email' className='validate'
                  onChange={(e) => this.setState({email: e.target.value})} />
              </div>

              <div className='input-field'>
                <label htmlFor='sign-in-password'>Password:</label>
                <input
                  id='sign-in-password' type='password' className='validate'
                  onChange={(e) => this.setState({password: e.target.value})} />
              </div>

              <button onClick={(ev) => this.signIn(ev)}
                className='btn waves-effect waves-light white-text grey darken-2'>
                Sign In
                <i className="material-icons right">person</i>
              </button>

              <button onClick={(ev) => this.forgotPassword(ev)}
                className='btn waves-effect waves-light white-text grey darken-2 right'>
                Forgot Password
              </button>

            </form>
          </div>
        </div>
      </div>
    );

  }

}

SignIn.propTypes = {
  createTokenMutation: PropTypes.any,
};

export default compose(
    graphql(createTokenMutation, {name: 'createTokenMutation'}),
)(SignIn);
