const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router
  .route('/login')
  .get((req, res, next) => {
    res.render('login');
  })
  .post(userController.login);

router
  .route('/createAccount')
  .get((req, res, next) => {
    res.render('createAccount');
  })
  .post(userController.auth, userController.createUser);

router.route('/home').get(userController.home);
module.exports = router;
