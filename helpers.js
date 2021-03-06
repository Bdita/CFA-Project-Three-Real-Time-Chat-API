const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
  const getUserInfo = {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    companyName: request.profile.companyName,
    email: request.email,
    role: request.role
  };

  return getUserInfo;
};

exports.getRole = function getRole(checkRole) {
  let role;

  switch (checkRole) {
    case ROLE_ADMIN: role = 2; break;
    case ROLE_CLIENT: role = 1; break;
    default: role = 1;
  }

  return role;
};
