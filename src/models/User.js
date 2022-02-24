const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uid: String,
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    role: {
      type: String,
      default: 'subscriber',
      enum: ['admin', 'subscriber'],
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
