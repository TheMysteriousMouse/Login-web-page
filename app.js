const express = require('express');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use('/security', userRoutes);
app.use((req, res, next) => {
  res.status(404).render('404');
});
module.exports = app;
