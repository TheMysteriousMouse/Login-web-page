const express = require('express');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('views'));
app.use('/security', userRoutes);

module.exports = app;
