export const showSnackbar = (message, variant) => ({
  type: 'ADD_SNACKBAR',
  payload: {
    snackbar: {
      message,
      variant,
    },
  },
});

export const hideSnackbar = () => ({
  type: 'HIDE_SNACKBAR',
  payload: {},
});
