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

import BrandVertical from './BrandVertical';
import {createPasswordResetMutation} from '../queries';
import * as S from '../strings';
import DialogContainer from './DialogContainer';

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
      loading: false,
      sent: false,
    };
    this.dialogRef = React.createRef();

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

    const dialog = this.dialogRef.current;

    event.preventDefault();

    this.setState({loading: true});

    this.props.createPasswordResetMutation({
      variables: {
        email: this.state.email,
      },
    }).then(({data}) => {

      try {

        const email = data.createPasswordResetMutation.email;

        dialog.showMessage(
            S.forgotPasswordDialogTitle,
            S.forgotPasswordDialogMessage.replace('$EMAIL', email),
            () => {

              this.props.history.push('/sign-in');

            });

        this.setState({sent: true});

      } catch (err) {

        console.error(err);
        dialog.showError('unknown');

      }

    }).catch((err) => {

      const msg = err.toString();

      if (msg.indexOf(S.gqlResponseInvalidPermissions) !== -1) {

        // users aren't allowed to use this portal!
        dialog.showError('authorization');


      } else {

        // something else went wrong
        console.error(err);
        dialog.showError('unknown');

      }

    }).finally(() => {

      this.setState({loading: false});

    });

  }
  /**
   * Renders the component.
   * @return {*}
   */
  render() {

    return (
      <DialogContainer ref={this.dialogRef}>
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
                  autoFocus
                  placeholder={S.placeholderEmail}
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
              <br />
              {this.state.loading && <LinearProgress variant='query' />}
            </Paper>
          </Grid>
        </Grid>
      </DialogContainer>
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
