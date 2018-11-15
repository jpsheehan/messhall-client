export const showSnackbar = (message, variant, callback) => ({
  type: 'SHOW_SNACKBAR',
  payload: {
    snackbar: {
      message,
      variant,
      callback,
    },
  },
});

export const hideSnackbar = () => ({
  type: 'HIDE_SNACKBAR',
  payload: {},
});
