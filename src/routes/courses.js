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
const { isAuthenticated } = require('../middleware/isAuthenticated');
const { isEnrolled } = require('../middleware/isEnrolled');
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
  isAuthenticated,
  authorize('admin'),
  validateRequest,
  createCourse
);

router.get('/all', getCourses);
router.get('/admin', isAuthenticated, authorize('admin'), getAdminCourses);
router
  .route('/:slug')
  .get(getSingleCourse)
  .put(isAuthenticated, authorize('admin'), updateCourse);

router.put(
  '/:slug/sections/add/:instructor',
  isAuthenticated,
  authorize('admin'),
  addSection
);
router.put(
  '/:slug/:sectionId/lessons/add/:instructor',
  isAuthenticated,
  authorize('admin'),
  addLesson
);
router.put(
  '/:courseId/publish-unpublish',
  isAuthenticated,
  authorize('admin'),
  publishUnpublishCourse
);

router.get('/check-enrollment/:slug', isAuthenticated, checkEnrollmentServer);
router.put('/free-enrollment/:courseId', isAuthenticated, freeEnrollment);
router
  .route('/user/course/:slug')
  .get(isAuthenticated, isEnrolled, getSingleCourse);

module.exports = router;
