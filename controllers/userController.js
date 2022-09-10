exports.home = (req, res, next) => {
  res.render('home');
};

exports.login = (req, res, next) => {
  res.render('login');
};

exports.createAccount = (req, res, next) => {
  res.render('createAccount');
};
exports.forgotPassword = (req, res, next) => {
  res.render('forgotPassword');
};
