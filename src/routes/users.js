const express = require('express');
const { createUser, getCurrentUser } = require('../controllers/user');
const { firebaseAuthCheck } = require('../middleware/firebaseAuth');
const router = express.Router();

router.get('/current', firebaseAuthCheck, getCurrentUser);
router.post('/create', firebaseAuthCheck, createUser);

module.exports = router;
