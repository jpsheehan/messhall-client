/* eslint max-len: 0 */

/**
 * Branding constants
 */
export const brandName = 'Appetite';

export const brandSlogan = 'A new way to have your say';

/**
 * Errors to display to the user
 */
export const errors = {
  authorization: {
    title: 'Authorization Error',
    message: 'There was an error signing you in. You must use the mobile app to use this service.',
  },
  authentication: {
    title: 'Authentication Error',
    message: 'There was an error signing you in. Please check that your email address and password were entered correctly.',
  },
  unknown: {
    title: 'Unknown Error',
    message: 'An unknown error occurred while signing you in. Please try again later',
  },
};

/**
 * Error messages returned from GraphQL
 */
export const gqlResponseInvalidCredentials = 'Invalid email or password.';

export const gqlResponseInvalidPermissions = 'User does not have proper permissions to create a token';

/**
 * Sign In Page
 */
export const buttonSignIn = 'Sign In';

export const buttonForgotPassword = 'Help';

export const placeholderEmail = 'johndoe@example.com';

/**
 * Forgot Password Page
 */

export const forgotPasswordDialogTitle = 'Password Reset Sent';

export const forgotPasswordDialogMessage = 'An email containing the password reset link has been sent to \'$EMAIL\'. Please check your inbox and follow the instructions.';

/**
 * UserList Component
 */

export const userListErrorLoading = 'Sorry, there was an error loading the data';

/**
 * UserDetails Component
 */

export const userDetailsErrorLoading = userListErrorLoading;

/**
 * CreateUser Component
 */

export const placeholderFirstName = 'John';

export const placeholderLastName = 'Doe';
