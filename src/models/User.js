const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
    _id: false,
  }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
