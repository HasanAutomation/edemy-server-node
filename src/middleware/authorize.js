const User = require('../models/User');
const AppError = require('../util/error');

exports.authorize =
  (...roles) =>
  async (req, res, next) => {
    const user = await User.findOne({ uid: req.user.uid });
    req.user._id = user._id;
    if (!roles.includes(user.role)) {
      return next(
        new AppError(
          `User role ${user.role} is not authorized to access this route`,
          403
        )
      );
    } else {
      next();
    }
  };
