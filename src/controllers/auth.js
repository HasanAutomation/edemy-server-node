const catchAsync = require('../middleware/catchAsync');
const User = require('../models/User');
const hashService = require('../services/hash-service');
const otpService = require('../services/otp-service');
const AppError = require('../util/error');

// Send Otp
exports.sendOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) return next(new AppError('Email is taken', 400));

  const otp = otpService.generateOtp();
  const ttl = 1000 * 60 * 5;

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
