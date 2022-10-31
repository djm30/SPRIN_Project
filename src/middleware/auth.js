/**
 *
 * @param  {string} roles
 * @returns {function}  validates if logged in user is in one of the given roles
 */

/*eslint-disable */
const authorize = (...roles) => {
  return (req, res, next) => {
    let isAuthorized = false;
    if (!req.user) return res.status(403).send("Forbidden");
    for (let role of roles) {
      if (req.user.role === role) {
        next();
        isAuthorized = true;
        break;
      }
    }
    // if (req.isAuthenticated()) next();
    if (!isAuthorized) res.status(403).send("Forbidden");
  };
};

module.exports = authorize;
