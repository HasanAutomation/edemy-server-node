const catchAsync = require('./catchAsync');
const AppError = require('../util/error');
const admin = require('../firebase/index');

exports.firebaseAuthCheck = catchAsync(async (req, res, next) => {
  const tokenString = req.headers['authorization'];

  if (!tokenString) return next(new AppError(`Token is expected`, 400));
  const token = tokenString.split(' ')[1];
  const firebaseUser = await admin.auth().verifyIdToken(token);
  req.user = firebaseUser;
  next();
});
