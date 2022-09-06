const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  res.render('./index');
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(200).render('home');
  } catch (err) {
    res.status(400).render('createAccount', { err: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = { ...req.body };

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('No user found with those credentials');
    }
    if (!email || !password) {
      throw new Error('Please enter an email or password');
    }
    const correctPassword = await user.correctPassword(password, user.password);

    if (!correctPassword) {
      throw new Error('Please enter the correct password');
    }

    res.status(200).render('home');
  } catch (err) {
    res.status(400).render('login', { err: err.message });
  }
};

exports.protect = async (req, res, next) => {};
