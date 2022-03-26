const catchAsync = require('../middleware/catchAsync');
const User = require('../models/User');
const hashService = require('../services/hash-service');
const otpService = require('../services/otp-service');
const passwordService = require('../services/password-service');
const AppError = require('../util/error');

// Send Otp
exports.sendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) return next(new AppError('Email is taken', 400));

  const otp = otpService.generateOtp();
  const ttl = 1000 * 60 * 1;

  const expires = Date.now() + ttl;

  const data = `${email}.${otp}.${expires}`;

  //Hash
  const hash = hashService.hashData(data);

  // Send an OTP
  try {
    await otpService.sendOtp(email, otp);
    res.status(200).json({
      success: true,
      data: {
        message: 'Success,Please check your mailbox!',
        hash: `${hash}.${expires}`,
        email,
      },
    });
  } catch (err) {
    console.log('errrrrrrrrrrr', err);
    next(new AppError('OTP is not sent!Please try again', 400));
  }
});

exports.verifyOtp = catchAsync(async (req, res, next) => {
  const { email, hash, otp } = req.body;
  const [hashedData, expires] = hash.split('.');

  if (Date.now() > +expires) return next(new AppError('OTP expired', 400));

  const data = `${email}.${otp}.${expires}`;

  const computedHash = hashService.hashData(data);

  if (hashedData !== computedHash)
    return next(new AppError('OTP is invalid', 400));

  res.json({
    success: true,
    data: {
      message: 'OTP verified',
    },
  });
});

exports.newUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return next(new AppError('User is taken', 400));

  const user = await User.create({
    name,
    email,
    password,
    isVerified: true,
    verified: new Date(),
  });

  await user.save();

  // tokens

  res.status(201).json({
    success: true,
    data: {
      user,
    },
  });
});

exports.authenticate = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) return next(new AppError('Invalid credentials', 401));

  const matched = await passwordService.comparePassword(
    password,
    user.password
  );

  if (!matched) return next(new AppError('Invalid credentials', 401));

  // tokens

  res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});
