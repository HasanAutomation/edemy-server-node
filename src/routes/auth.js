const express = require('express');
const {
  sendOtp,
  verifyOtp,
  newUser,
  authenticate,
  getCurrentUser,
} = require('../controllers/auth');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/new-user', newUser);
router.post('/login', authenticate);
router.get('/current', isAuthenticated, getCurrentUser);

module.exports = router;
