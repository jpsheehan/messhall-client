import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';

import {graphql, compose} from 'react-apollo';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import BasicDialog from './BasicDialog';
import {createTokenMutation} from '../queries';

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
      errorTitle: 'Error',
      errorMessage: 'Message',
      errorShown: false,
    };
    this.errorDialog = createRef();

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

          this.props.history.push('/' + user.role);

        } else {


        }

      } catch (err) {

        ;

      }

    }).catch((err) => {

      if (err.toString().indexOf('Invalid email or password.') !== -1) {

        // email or password was incorrect
        this.showAuthenticationError();

      } else if (err.toString().indexOf('User does not have proper permissions to create a token') !== -1) {

        // users aren't allowed to use this portal!
        this.showAuthorizationError();


      } else {

        // something else went wrong
        console.error(err);
        this.showUnknownError();

      }

    });

  }

  /**
   * Displays an authentication error to the user.
   */
  showAuthenticationError() {

    this.setState({
      errorTitle: 'Authentication Error',
      errorMessage: 'There was an error signing you in. Please check that your email address and password were entered correctly.',
      errorShown: true,
    });

  }

  /**
   * Displays an authorization error message to the user.
   */
  showAuthorizationError() {

    this.setState({
      errorTitle: 'Authorization Error',
      errorMessage: 'There was an error signing you in. You must use the mobile app to use this service.',
      errorShown: true,
    });

  }

  /**
   * Displays an unknown error message to the user.
   */
  showUnknownError() {

    // email or password was incorrect
    this.setState({
      errorTitle: 'Unknown Error',
      errorMessage: 'An unknown error occurred while signing you in. Please try again later',
      errorShown: true,
    });

  }

  /**
   * To be called when the ErrorDialog child is closed.
   */
  onErrorDialogClose() {

    this.setState({errorShown: false});

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

              <Button type='submit' variant='outlined' onClick={(ev) => this.signIn(ev)}>
                Sign In
                <Icon>person</Icon>
              </Button>

              <Button className='right' onClick={(ev) => this.forgotPassword(ev)}>
                Forgot Password
              </Button>

            </form>
          </div>
        </div>
        <BasicDialog
          title={this.state.errorTitle}
          message={this.state.errorMessage}
          open={this.state.errorShown}
          onClose={() => this.onErrorDialogClose()} />
      </div>
    );

  }

}

SignIn.propTypes = {
  createTokenMutation: PropTypes.any,
  history: PropTypes.any,
};

export default compose(
    graphql(createTokenMutation, {name: 'createTokenMutation'}),
)(SignIn);
