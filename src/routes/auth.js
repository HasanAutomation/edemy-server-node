const express = require('express');
const {
  sendOtp,
  verifyOtp,
  newUser,
  authenticate,
} = require('../controllers/auth');
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/new-user', newUser);
router.post('/login', authenticate);

module.exports = router;
