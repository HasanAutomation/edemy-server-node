const jwt = require('jsonwebtoken');
class JwtService {
  createJWT(payload, expiration, secret) {
    return jwt.sign(payload, secret, {
      expiresIn: expiration,
    });
  }
  isTokenValid(token, secret) {
    return jwt.verify(token, secret);
  }
}

module.exports = new JwtService();
