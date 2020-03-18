const express = require('express');
const ctrlUsers = require('../controllers/users.controllers');
const router = express.Router();

router.get('/renderSignUpForm', ctrlUsers.renderSignUpForm);
router.post('/signup', ctrlUsers.signup);
router.get('/renderSignInForm', ctrlUsers.renderSignInForm);
router.post('/signin', ctrlUsers.signin);
router.get('/logout', ctrlUsers.logout);

module.exports = router;