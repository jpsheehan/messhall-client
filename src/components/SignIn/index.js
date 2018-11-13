import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';

import {
  Button,
  TextField,
  Grid,
  Paper,
  LinearProgress,
} from '@material-ui/core';

import {
  Person as PersonIcon,
} from '@material-ui/icons';

import {createTokenMutation} from '../../queries';
import BrandVertical from '../BrandVertical';
import DialogContainer from '../DialogContainer';
import * as S from '../../strings';

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
      loading: false,
    };
    this.dialogRef = React.createRef();

  }

  /**
   * Helps the user reset their password.
   * @param {Event} event The event passed from the DOM
   */
  onForgotPasswordClick(event) {

    this.props.history.push('/forgot-password');

  }

  /**
   * Called when the user clicks the submit button.
   * @param {Event} event The event object.
   */
  onFormSubmit(event) {

    event.preventDefault();

    this.setState({loading: true});

    this.props.createTokenMutation({
      variables: {
        email: this.state.email,
        password: this.state.password,
      },
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

      const msg = err.toString();
      const dialog = this.dialogRef.current;

      if (msg.indexOf(S.gqlResponseInvalidCredentials) !== -1) {

        // email or password was incorrect
        dialog.showError('authentication');

      } else if (msg.indexOf(S.gqlResponseInvalidPermissions) !== -1) {

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

              <form onSubmit={(ev) => this.onFormSubmit(ev)}>

                <TextField
                  id='sign-in-email'
                  label='Email'
                  type='email'
                  fullWidth
                  margin='dense'
                  autoFocus
                  placeholder={S.placeholderEmail}
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
                      disabled={this.state.loading}>
                      {S.buttonSignIn}
                      <PersonIcon />
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={(ev) => this.onForgotPasswordClick(ev)}
                      disabled={this.state.loading}>
                      {S.buttonForgotPassword}
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

SignIn.propTypes = {
  createTokenMutation: PropTypes.any,
  history: PropTypes.any,
};

export default compose(
    graphql(createTokenMutation, {name: 'createTokenMutation'}),
)(SignIn);
