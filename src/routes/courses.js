const express = require('express');
const { body } = require('express-validator');
const {
  createCourse,
  getCourses,
  getAdminCourses,
  getSingleCourse,
} = require('../controllers/Course');
const { authorize } = require('../middleware/authorize');
const { firebaseAuthCheck } = require('../middleware/firebaseAuth');
const validateRequest = require('../middleware/requestHandler');
const router = express.Router();

router.post(
  '/create',
  [
    body('name').isString().withMessage('Please add a name'),
    body('description').isString().withMessage('Please add a description'),
    body('category').isString().withMessage('Please add a category'),
  ],
  firebaseAuthCheck,
  authorize('admin'),
  validateRequest,
  createCourse
);

router.get('/all', getCourses);
router.get('/admin', firebaseAuthCheck, authorize('admin'), getAdminCourses);
router.get('/:slug', getSingleCourse);

module.exports = router;
