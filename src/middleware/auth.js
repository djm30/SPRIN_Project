const authorize = async (...roles) => {
  return async (req, res, next) => {
    for (let role of roles) {
      if (req.user.role == role) {
        next();
      }
    }
    res.status(403).send("Forbidden");
  };
};

module.exports = authorize;
