const express = require('express');
const userController = require('../model/userController');
const app = express.Router();

app.get('/login', userController.login);

module.exports = app;
