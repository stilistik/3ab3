const { verifyAndDecodeToken } = require('../auth/verify');

function getUserPower(user) {
  const RolePower = {
    MEMBER: 1,
    ADMIN: 2,
    SUPER: 3,
  };

  return RolePower[user.role] || 0;
}

function canUserModifyUser(modifyingUser, userToBeModified) {
  return getUserPower(modifyingUser) - getUserPower(userToBeModified) >= 0;
}

async function canUserModifyEvent(args, context) {
  const { id } = verifyAndDecodeToken(context);
  const owner = await context.prisma.event({ id: args.eventId }).owner();
  const committee = await context.prisma
    .event({ id: args.eventId })
    .committee();
  if (owner.id === id) {
    // user is creator of event
    return true;
  } else if (committee.some((user) => user.id === id)) {
    // user is committee member
    return true;
  }
  return false;
}

module.exports = {
  getUserPower,
  canUserModifyUser,
  canUserModifyEvent,
};
