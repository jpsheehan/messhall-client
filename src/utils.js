/**
 * Gets whether or not the user is logged in.
 * @return {Boolean}
 */
function isLoggedIn() {

  return (
    localStorage.getItem('user_name') &&
    localStorage.getItem('user_id') &&
    localStorage.getItem('user_role') &&
    localStorage.getItem('token') &&
    localStorage.getItem('token_id') &&
    (
      localStorage.getItem('user_role') === 'admin' ||
      localStorage.getItem('user_role') === 'manager'
    )
  );

}

export {
  isLoggedIn,
};
