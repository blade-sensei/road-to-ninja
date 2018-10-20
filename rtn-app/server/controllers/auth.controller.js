const authService = require('../services/auth.service');

/*
 * return object auth
 */
const login = ({ username, password }) => {
  return authService.login(username, password);
};

module.exports = {
  login,
};
