// routes/signup_auth.js
const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupcontroller');  // Import the controller

// Define the POST route for signup
router.post('/signup', signupController.signup);  // Call the signup function from the controller

module.exports = router;
