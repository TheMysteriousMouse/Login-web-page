const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const sendEmailToken = async (user, res) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: 'f3bbba15df9113',
      pass: 'aeed8defb55b5c',
    },
    secureConnection: 'false',
    tls: {
      ciphers: 'SSLv3',
    },
  });
  const mailOptions = {
    from: 'Cody Carmony <codywcarmony@gmail.com>',
    to: user.email,
    subject: 'Forgotten Password from SEC',
    text: 'Your reset token is x83x834wccxer', // Non functional
  };

  await transport.sendMail(mailOptions);
};

const createToken = (user, res, next) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '20m',
  });

  res.cookie('jwt', token);
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createToken(user, res);
    res.status(200).redirect('home');
  } catch (err) {
    res.status(400).render('createAccount', { err: err.message });
  }
};

exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.sendStatus(404);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // Almost done
  } catch {
    return res.sendStatus(403);
  }
  next();
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
    createToken(user, res);
    res.status(200).redirect('home');
  } catch (err) {
    res.status(400).render('login', { err: err.message });
  }
};

exports.checkEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    let err = {
      message: 'Email Sent',
    };
    if (!user) {
      err.message = "User doesn't exists";
    }

    await sendEmailToken(user, res);
    res.status(200).render('forgotPassword', { err: err.message });
  } catch (err) {
    res.status(404).render('forgotPassword', { err: err.message });
  }
};
