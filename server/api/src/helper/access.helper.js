function getUserPower(user) {
  const RolePower = {
    MEMBER: 1,
    ADMIN: 2,
    SUPER: 3,
  };

  return RolePower[user.role] || 0;
}

function canUserModify(modifyingUser, userToBeModified) {
  return getUserPower(modifyingUser) - getUserPower(userToBeModified) > 0;
}

module.exports = {
  getUserPower,
  canUserModify,
};
