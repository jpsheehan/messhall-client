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
   * Called when the user clicks the submit button.
   * @param {Event} event The event object.
   */
  submitForm(event) {

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
        <div id='sign-in' className='col s6 offset-s3'>
          <h5>Sign In</h5>
          <div>
            <form onSubmit={this.submitForm.bind(this)}>

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

              <button className='btn waves-effect waves-light'>
                Sign In
                <i className="material-icons right">person</i>
              </button>

              <button className='btn waves-effect right'>
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
