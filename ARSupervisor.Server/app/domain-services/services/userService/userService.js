const { ValidationError } = require('../../errors/index.js');

function userService(User, Role) {
  async function getUserInfoById(id) {
    const user = await User.getUserById(id);
    if (!user) {
      throw new ValidationError()
    }
    const userRole = await Role.getRoleById(id);
    return {
      id: user.id,
      email: user.email,
      firstName: user?.firstName || null,
      lastName: user?.lastName || null,
      role: userRole?.role || null,
    };
  }

  async function getUserImage(id) {
    const image = await User.getUserImage(id);
    return image
  }

  async function addUserImage(userId, imageFile) {
    if (!userId, !imageFile) {
      throw new ValidationError()
    }
    await User.addUserImage(userId, imageFile);
  }

  return Object.freeze({
    getUserInfoById,
    getUserImage,
    addUserImage,
  });
}

module.exports = userService;

