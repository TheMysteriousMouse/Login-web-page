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
  .post(userController.createUser);

router.route('/home').get((req, res, next) => {
  res.render('home');
});
module.exports = router;
