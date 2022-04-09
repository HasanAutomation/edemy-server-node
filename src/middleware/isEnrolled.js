const Course = require('../models/Course');
const AppError = require('../util/error');
const catchAsync = require('./catchAsync');

exports.isEnrolled = catchAsync(async (req, res, next) => {
  const user = req.user;
  const slug = req.params.slug;

  const course = await Course.findOne({ slug });

  if (!course) return next(new AppError("Course doesn't exist", 404));

  if (!user.courses.includes(course._id.toString()))
    return next(new AppError('You are not enrolled into the course', 400));

  next();
});
