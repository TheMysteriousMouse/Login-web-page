const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/login').get(userController.login).post(authController.login);

router
  .route('/createAccount')
  .get(userController.createAccount)
  .post(authController.createUser);

router
  .route('/forgotPassword')
  .get(userController.forgotPassword)
  .post(authController.checkEmail);

router.route('/home').get(authController.auth, userController.home);

module.exports = router;
