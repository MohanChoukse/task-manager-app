const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

// POST /api/signup
router.post('/signup', signup);

// POST /api/login
router.post('/login', login);

module.exports = router; 