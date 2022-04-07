const User = require('../models/User');
const AppError = require('../util/error');

exports.authorize =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    } else {
      next();
    }
  };
