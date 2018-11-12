import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import BasicDialog from './BasicDialog';
import BrandVertical from './BrandVertical';
import {createPasswordResetMutation} from '../queries';

/**
 * The component for requesting a password reset for admins and managers.
 */
class ForgotPassword extends Component {

  /**
   * Creates a new SignIn component.
   * @param {Object} props The properties of this component.
   */
  constructor(props) {

    super(props);
    this.state = {
      email: '',
      errorTitle: 'Error',
      errorMessage: 'Message',
      errorCallback: null,
      errorShown: false,
      loading: false,
      sent: false,
    };

  }

  /**
   * Helps the user reset their password.
   * @param {Event} event The event passed from the DOM
   */
  onBackClick(event) {

    this.props.history.push('/sign-in');

  }

  /**
   * Called when the user clicks the submit button.
   * @param {Event} event The event object.
   */
  onFormSubmit(event) {

    event.preventDefault();

    this.setState({loading: true});

    this.props.createPasswordResetMutation({
      variables: {
        email: this.state.email,
      },
    }).then(({data}) => {

      try {

        const email = data.createPasswordResetMutation.email;

        this.showEmailSent(email);
        this.setState({sent: true});

      } catch (err) {

        console.error(err);
        this.showUnknownError();

      }

    }).catch((err) => {

      if (err.toString().indexOf('User does not have proper permissions to create a token') !== -1) {

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
   * Displays an authorization error message to the user.
   */
  showAuthorizationError() {

    this.setState({
      errorTitle: 'Authorization Error',
      errorMessage: 'There was an error signing you in. You must use the mobile app to use this service.',
      errorCallback: null,
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
      errorCallback: null,
      errorShown: true,
    });

  }

  /**
   * Displays a message informing the user that the email has been sent
   * @param {String} email The email address the reset link was sent to
   * @param {Function} callback The function to be called when the dialog is closed.
   */
  showEmailSent(email) {

    // email has been sent to the inbox
    this.setState({
      errorTitle: 'Password Reset Sent',
      errorMessage: `An email containing the password reset link has been sent to '${email}'. Please check your inbox and follow the instructions.`,
      errorShown: true,
      errorCallback: () => {

        this.props.history.push('/sign-in');

      },
    });

  }

  /**
   * To be called when the ErrorDialog child is closed.
   */
  onErrorDialogClose() {

    this.setState({errorShown: false});

    if (this.state.errorCallback) {

      this.state.errorCallback();

    }

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

            <Typography>
              Reset your password by filling out the form below.
              A password reset link will be sent to your email address.
            </Typography>

            <form onSubmit={(ev) => this.onFormSubmit(ev)}>

              <TextField
                id='sign-in-email'
                label='Email'
                type='email'
                fullWidth
                margin='dense'
                autoFocus
                placeholder='johndoe@example.com'
                onChange={(e) => this.setState({email: e.target.value})}
                disabled={this.state.loading && !this.state.sent} />

              <br />
              <br />
              <Grid container justify='space-between'>
                <Grid item>
                  <Button
                    type='submit'
                    variant='outlined'
                    disabled={this.state.loading && !this.state.sent}>
                    Reset
                    <Icon>lock</Icon>
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    onClick={(ev) => this.onBackClick(ev)}
                    disabled={this.state.loading}>
                    Back
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

ForgotPassword.propTypes = {
  createPasswordResetMutation: PropTypes.any,
  history: PropTypes.any,
};

export default compose(
    graphql(createPasswordResetMutation, {name: 'createPasswordResetMutation'}),
)(ForgotPassword);
