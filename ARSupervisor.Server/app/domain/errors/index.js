class DomainError extends Error {
  constructor(message) {
    super(message);
  }
}

class UserAllreadyExist extends DomainError {
  constructor(email) {
    super(`User '${email}' allready exist`);
    this.email = email;
  }
}

class UserDosentExist extends DomainError {
  constructor(email) {
    super(`User '${email}' dosen't exist`);
    this.email = email;
  }
}

class AssetIsAlreadyExist extends DomainError {
  constructor(id) {
    super(`Asset '${id}' allready exist`);
    this.id = id;
  }
}

class AssetDosentExist extends DomainError {
  constructor(id) {
    super(`Asset '${id}' dosen't exist`);
    this.id = id;
  }
}

class AssetsSessionAlreadyExist extends DomainError {
  constructor(id) {
    super(`AssetsSession '${id}' already exist`);
    this.id = id;
  }
}

class AssetsSessionDosentExist extends DomainError {
  constructor(id) {
    super(`AssetsSession '${id}' dosen't exist`);
    this.id = id;
  }
}

module.exports = {
  DomainError,
  UserDosentExist,
  UserAllreadyExist,
  AssetIsAlreadyExist,
  AssetDosentExist,
  AssetsSessionAlreadyExist,
  AssetsSessionDosentExist,
};
