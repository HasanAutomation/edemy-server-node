const express = require('express');
const {
  createUser,
  getCurrentUser,
  getUserCourses,
} = require('../controllers/user');
const { firebaseAuthCheck } = require('../middleware/firebaseAuth');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const router = express.Router();

router.get('/current', firebaseAuthCheck, getCurrentUser);
router.post('/create', firebaseAuthCheck, createUser);
router.get('/courses', isAuthenticated, getUserCourses);

module.exports = router;
