const express = require('express');
const { body } = require('express-validator');
const {
  createCourse,
  getCourses,
  getAdminCourses,
  getSingleCourse,
  addSection,
  addLesson,
  updateCourse,
  publishUnpublishCourse,
  getPublishedCourses,
  checkEnrollmentServer,
  freeEnrollment,
} = require('../controllers/Course');
const { authorize } = require('../middleware/authorize');
const { firebaseAuthCheck } = require('../middleware/firebaseAuth');
const validateRequest = require('../middleware/requestHandler');
const router = express.Router();

router.get('/published-courses', getPublishedCourses);
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
router
  .route('/:slug')
  .get(getSingleCourse)
  .put(firebaseAuthCheck, authorize('admin'), updateCourse);

router.put(
  '/:slug/sections/add/:instructor',
  firebaseAuthCheck,
  authorize('admin'),
  addSection
);
router.put(
  '/:slug/:sectionId/lessons/add/:instructor',
  firebaseAuthCheck,
  authorize('admin'),
  addLesson
);
router.put(
  '/:courseId/publish-unpublish',
  firebaseAuthCheck,
  authorize('admin'),
  publishUnpublishCourse
);

router.get('/check-enrollment/:slug', firebaseAuthCheck, checkEnrollmentServer);
router.put('/free-enrollment/:courseId', firebaseAuthCheck, freeEnrollment);

module.exports = router;
