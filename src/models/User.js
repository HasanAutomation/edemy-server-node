const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 4,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
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

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
