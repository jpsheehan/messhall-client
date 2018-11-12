import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import BasicDialog from './BasicDialog';
import {createTokenMutation} from '../queries';
import BrandVertical from './BrandVertical';

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
      loading: false,
    };

  }

  /**
   * Helps the user reset their password.
   * @param {Event} event The event passed from the DOM
   */
  forgotPassword(event) {

    this.props.history.push('/forgot-password');

  }

  /**
   * Called when the user clicks the submit button.
   * @param {Event} event The event object.
   */
  signIn(event) {

    event.preventDefault();

    this.setState({loading: true});

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

          throw new Error('User is not a manager or admin');

        }

      } catch (err) {

        console.error(err);
        this.showUnknownError();

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

    }).finally(() => {

      this.setState({loading: false});

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
      <Grid
        container
        spacing={0}
        directions='column'
        alignItems='center'
        justify='center'>
        <Grid item xs={3}>
          <Paper
            id='sign-in'>
            <BrandVertical />

            <br />

            <form>

              <TextField
                id='sign-in-email'
                label='Email'
                type='email'
                fullWidth
                margin='dense'
                autoFocus
                placeholder='johndoe@example.com'
                onChange={(e) => this.setState({email: e.target.value})}
                disabled={this.state.loading} />

              <TextField
                id='sign-in-password'
                label='Password'
                type='password'
                fullWidth
                margin='normal'
                onChange={(e) => this.setState({password: e.target.value})}
                disabled={this.state.loading} />

              <br />
              <br />

              <Grid container justify='space-between'>
                <Grid item>
                  <Button
                    type='submit'
                    variant='outlined'
                    onClick={(ev) => this.signIn(ev)}
                    disabled={this.state.loading}>
                    Sign In
                    <Icon>person</Icon>
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    className='right'
                    onClick={(ev) => this.forgotPassword(ev)}
                    disabled={this.state.loading}>
                    Help
                  </Button>
                </Grid>
              </Grid>

            </form>
            {this.state.loading && <LinearProgress variant='query' />}
          </Paper>
          <BasicDialog
            title={this.state.errorTitle}
            message={this.state.errorMessage}
            open={this.state.errorShown}
            onClose={() => this.onErrorDialogClose()} />
        </Grid>
      </Grid>
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
