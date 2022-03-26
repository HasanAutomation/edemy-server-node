const bcrypt = require('bcryptjs');
class PasswordService {
  comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

module.exports = new PasswordService();
