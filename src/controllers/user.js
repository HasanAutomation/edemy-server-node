const catchAsync = require('../middleware/catchAsync');
const User = require('../models/User');
const AppError = require('../util/error');

exports.createUser = catchAsync(async (req, res, next) => {
  const { email, uid } = req.user;
  const { displayName } = req.body;
  const user = await User.findOne({ email });

  if (user) return next(new AppError('User is taken', 400));

  const userCreated = await User.create({
    email,
    name: displayName,
    uid,
  });

  res.json({ success: true, data: { user: userCreated }, errors: [] });
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ uid: req.user.uid });
  if (!user) return next(new AppError('No User found', 404));
  res.status(200).json({
    success: true,
    data: {
      user,
    },
    errors: [],
  });
});
