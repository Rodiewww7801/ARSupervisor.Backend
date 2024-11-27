const { ValidationError } = require('../../errors/index.js');

function userService(User, Role) {
  async function getUserInfoById(id) {
    if (!id) {
      throw new ValidationError()
    }

    const user = await User.getUserById(id);
    if (!user) {
      throw new ValidationError()
    }
    const userRole = await Role.getRoleById(id);
    return {
      id: user.id,
      email: user.email,
      imageURL: user?.imageURL || null,
      firstName: user?.firstName || null,
      lastName: user?.lastName || null,
      role: userRole?.role || null,
    };
  }

  return Object.freeze({
    getUserInfoById,
  });
}

module.exports = userService;

