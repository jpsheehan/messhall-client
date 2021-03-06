import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import {connect} from 'react-redux';
import queryString from 'query-string';

import {
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  LinearProgress,
} from '@material-ui/core';

import {
  Lock as LockIcon,
} from '@material-ui/icons';

import {showSnackbar} from '../../actions';
import BrandVertical from '../BrandVertical';
import {createPasswordResetMutation} from '../../queries';
import * as S from '../../strings';

/**
 * The component for requesting a password reset for admins and managers.
 */
class ForgotPassword extends Component {

  /**
   * Creates a new SignIn component.
   * @param {Object} props The properties of this component.
   */
  constructor(props) {

    const parts = queryString.parse(props.location.search);

    super(props);
    this.state = {
      email: parts.email || '',
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

    // // useful for testing the case when the email is entered.
    // (() => {

    //   return new Promise((resolve) => resolve({
    //     data: {
    //       createPasswordResetMutation: {
    //         email: this.state.email,
    //       },
    //     }}));

    // })().then(({data}) => {

    this.props.createPasswordResetMutation({
      variables: {
        email: this.state.email,
      },
    }).then(({data}) => {

      try {

        const email = data.createPasswordResetMutation.email;

        this.props.showSnackbar(
            S.forgotPasswordDialogMessage.replace('$EMAIL', email),
            'info',
            () => this.props.history.push('/sign-in')
        );

        this.setState({sent: true});

      } catch (err) {

        console.error(err);
        this.props.showSnackbar(S.errors.unknown.message, 'warning');

      }

    }).catch((err) => {

      const msg = err.toString();

      if (msg.indexOf(S.gqlResponseInvalidPermissions) !== -1) {

        // users aren't allowed to use this portal!
        this.props.showSnackbar(S.errors.authorization.message, 'warning');

      } else {

        // something else went wrong
        console.error(err);
        this.props.showSnackbar(S.errors.unknown.message, 'warning');

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
                value={this.state.email}
                fullWidth
                autoFocus
                placeholder={S.placeholderEmail}
                onChange={(e) => this.setState({email: e.target.value})}
                disabled={this.state.loading || this.state.sent} />

              <br />
              <br />
              <Grid container justify='space-between'>
                <Grid item>
                  <Button
                    type='submit'
                    variant='outlined'
                    disabled={this.state.loading || this.state.sent}>
                    Reset
                    <LockIcon />
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
    );

  }

}

ForgotPassword.propTypes = {
  createPasswordResetMutation: PropTypes.any,
  history: PropTypes.any,
  location: PropTypes.object,
  showSnackbar: PropTypes.func,
};

const mapDispatchToProps = {
  showSnackbar,
};

export default connect(null, mapDispatchToProps)(
    compose(
        graphql(createPasswordResetMutation, {
          name: 'createPasswordResetMutation'}),
    )(ForgotPassword)
);
