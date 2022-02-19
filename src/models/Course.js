const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: {},
    },
    video: {},
    free_preview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {},
    lessons: [LessonSchema],
  },
  {
    timestamps: true,
  }
);

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {},
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    slug: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: {},
    },
    paid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
      lowercase: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    sections: [SectionSchema],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
