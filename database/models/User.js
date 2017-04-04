const { Document } = require('camo');

class User extends Document {
  constructor() {
    super();
    this.napsterToken = String;
  }

  static collectionName() {
    return 'users';
  }
}

module.exports = User;
