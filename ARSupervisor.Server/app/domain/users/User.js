const { UserAllreadyExist, UserDosentExist, DomainError } = require('../errors/index.js');

function User(userRepository, passwordService) {
  async function createUser(email, password) {
    const hashedPassword = await passwordService.hashPassword(password);
    const id = crypto.randomUUID().toString();
    const isUserExist = await userRepository.getUserByEmail(email);
    if (isUserExist) {
      throw new UserAllreadyExist(email);
    }
    const user = await userRepository.addUser(id, email, hashedPassword);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      hashedPassword: user.hashedPassword
    };
  }

  async function getUserByEmail(email) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new UserDosentExist(email);
    }
    return {
      id: user.id,
      email: user.email,
      hashedPassword: user.hashedPassword
    };
  }

  async function getUserById(id) {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new UserDosentExist(id);
    }
    return {
      id: user.id,
      email: user.email,
      hashedPassword: user.hashedPassword
    };
  }

  async function getUserImage(id) {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new UserDosentExist(id);
    }
    const image = await userRepository.getUserImage(id);
    if (!image) {
      return null;
    }
    return {
      image: image.image,
      mimetype: image.mimetype,
    }
  }

  async function addUserImage(userId, imageFile) {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new UserDosentExist(userId);
    }
    let id = crypto.randomUUID().toString();
    const success = await userRepository.addUserImage(userId, { id, ...imageFile });
    if (!success) {
      throw new DomainError('Failed to load image to database')
    }
  }


  async function verifyPassword(password, hashedPassword) {
    const verifiedPassword = await passwordService.verifyPassword(password, hashedPassword)
    return verifiedPassword
  }

  return {
    createUser,
    getUserByEmail,
    getUserById,
    verifyPassword,
    getUserImage,
    addUserImage,
  }
}

module.exports = User;
