const express = require('express');

const User = require('../models/user');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const passport = require('passport')
const { storeReturnTo } = require('../middleware');
const userController = require('../controller/userController');

const router = express.Router();

router.route('/register')
    .get(userController.renderRegisterForm)
    .post(userController.createUser);

router.route('/login')
    .get(userController.renderLoginForm)
    .post(storeReturnTo,passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),userController.login);

router.get('/logout', userController.logout)

module.exports = router;