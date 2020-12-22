const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//config
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./utils/passport-config');
const User = require('./models').User;

initializePassport(
  passport,
  async account=>await User.findAll({
    where: {
      account: account
    }
  }),
  async id=>await User.findAll({
    where: {
      id: id
    }
  })
)
const Routers = require('./routes/index')(passport);
app.use(flash());
app.use(session({ secret: 'popo', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

Routers.forEach(route => {
  app.use(route);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
