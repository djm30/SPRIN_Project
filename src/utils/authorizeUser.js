// Checks if user is either an admin, or is the owner of the requested resource
const authorizeUser = (reqUser, userID) => {
  // Checking if there is a user
  if (!reqUser) return false;
  // Checking if user is an admin
  if (reqUser.role !== "admin") {
    // If user is not an admin, does their id match the id of the user/user's resource they are trying to access?
    return reqUser._id.toString() === userID.toString();
  }
  return true;
};

module.exports = authorizeUser;
