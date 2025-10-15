const express = require('express');
const router = express.Router();
const { createCourse, listCourses } = require('../controllers/courses');
const { authenticateJWT, requireRole } = require('../middleware/auth');

// public read
router.get('/', listCourses);

// create - only instructors
router.post('/', authenticateJWT, requireRole('INSTRUCTOR'), createCourse);

module.exports = router;
