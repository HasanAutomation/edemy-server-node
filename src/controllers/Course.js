const catchAsync = require('../middleware/catchAsync');
const slugify = require('slugify');
const Course = require('../models/Course');
const AppError = require('../util/error');

exports.createCourse = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name, {
    lower: true,
  });
  const existingCourse = await Course.findOne({ slug });
  if (existingCourse) return next(new AppError('Course already exists', 400));

  const course = await Course.create({
    ...req.body,
    slug,
    instructor: req.user._id,
  });
  res.status(201).json({
    success: true,
    data: {
      course,
    },
    errors: [],
  });
});

exports.getCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find().populate('instructor');
  res.status(200).json({
    success: true,
    data: {
      courses,
    },
    errors: [],
  });
});

exports.getAdminCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({ instructor: req.user._id })
    .sort({
      createdAt: -1,
    })
    .populate('instructor');
  res.status(200).json({
    success: true,
    data: {
      courses,
    },
    errors: [],
  });
});

exports.getSingleCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ slug: req.params.slug }).populate(
    'instructor'
  );
  res.status(200).json({
    success: true,
    data: {
      course,
    },
    errors: [],
  });
});
