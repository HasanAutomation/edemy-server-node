const jwtService = require('../services/jwt-service');
const catchAsync = require('./catchAsync');

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const { access } = req.cookies;
  const user = jwtService.isTokenValid(
    access,
    process.env.JWT_ACCESS_TOKEN_SECRET
  );
  req.user = user;

  next();
});
