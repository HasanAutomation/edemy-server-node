const express = require('express');
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

module.exports = router;
