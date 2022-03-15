const express = require('express');
const { sendOtp } = require('../controllers/auth');
const {
  createUser,
  getCurrentUser,
  getUserCourses,
} = require('../controllers/user');
const { firebaseAuthCheck } = require('../middleware/firebaseAuth');
const router = express.Router();

router.get('/current', firebaseAuthCheck, getCurrentUser);
router.post('/create', firebaseAuthCheck, createUser);
router.get('/courses', firebaseAuthCheck, getUserCourses);
router.post('/auth/send-otp', sendOtp);

module.exports = router;
