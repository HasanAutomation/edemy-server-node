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

exports.updateCourse = catchAsync(async (req, res, next) => {
  const { slug } = req.params;

  const { instructor } = req.body;

  if (req.user._id != instructor._id)
    return next(new AppError('You are not authorized to do that', 403));

  if (!req.body.paid) {
    req.body.price = 0;
  }

  const course = await Course.findOneAndUpdate(
    { slug },
    { $set: req.body },
    { new: true }
  );

  res.status(200).json({
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
exports.addSection = catchAsync(async (req, res, next) => {
  const { instructor, slug } = req.params;
  const { title } = req.body;
  if (instructor != req.user._id)
    return next(new AppError('You are not authorized', 403));

  const updatedCourse = await Course.findOneAndUpdate(
    { slug },
    {
      $push: { sections: { title } },
    },
    {
      new: true,
    }
  ).populate('instructor');

  if (!updatedCourse) return next(new AppError('Course doesnt exist', 404));

  res.status(200).json({
    success: true,
    data: {
      course: updatedCourse,
    },
    errors: [],
  });
});

exports.addLesson = catchAsync(async (req, res, next) => {
  const { instructor, sectionId, slug } = req.params;
  const { title, content, video, free_preview } = req.body;
  if (instructor != req.user._id)
    return next(new AppError('You are not authorized', 403));

  const course = await Course.findOne({ slug }).populate('instructor');
  if (!course) return next(new AppError('Course doesnt exist', 404));

  const section = course.sections.find(section => section._id == sectionId);

  section.lessons.push({
    title,
    content,
    free_preview,
    slug: slugify(title, { lower: true }),
    video,
  });

  await course.save();

  res.status(200).json({
    success: true,
    data: {
      course,
    },
    errors: [],
  });
});

exports.publishUnpublishCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { published } = req.body;

  const course = await Course.findById(courseId).populate('instructor');

  if (course.instructor._id.toString() !== req.user._id.toString()) {
    return next(new AppError('You are not authorized to do this', 403));
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { published },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: {
      course: updatedCourse,
    },
    errors: [],
  });
});

exports.getPublishedCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find({ published: true }).populate('instructor');

  res.status(200).json({
    success: true,
    data: {
      courses,
    },
    errors: [],
  });
});
