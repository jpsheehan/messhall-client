import React, {Component} from 'react';

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
    /**
     * TODO: Sign the user in and store the token, handling any errors
     */

    //  this.props.createTokenMutation({
    //    variables: this.state,
    //  });

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
  createTokenMutation,
};

export default compose(
    graphql(createTokenMutation, {name: 'createTokenMutation'}),
)(SignIn);
