const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// var Routers = require('./routes/index');

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
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');
const User = require('./models').User;

initializePassport(
  passport,
  async function(account){
    let user = await User.findAll({
      where: {
        account: account
      }
    });
    return user;
  },
  async function(id){
    let user = await User.findAll({
      where: {
        id: id
      }
    });
    return user;
  }
)

const router = express.Router();

app.use(flash());
app.use(session({ secret: 'popo', resave: false, saveUninitialized: false }));

app.use(passport.initialize());


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', function (req, res, next) {
  res.render('register');
});
router.post('/register', async function (req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      account: req.body.account,
      password: hashedPassword,
      email: req.body.email
    }).then(() => {
      res.redirect('/login')
    });
  } catch (error) {
    res.render('register', { error: 'regist fail' });
  }
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', passport.authenticate('local', { successRedirect: '/member',failureRedirect:'/login',failureFlash:true }));

// router.post('/login', function (req, res, next) {
//   (async () => {
//     let user = await User.findAll({
//       where: {
//         account: req.body.account
//       }
//     });
//     console.log(`find ${user.length}:`);
//     for (let u of user) {
//       console.log(JSON.stringify(u));
//     }
//   })();
// });


router.get('/member', function (req, res, next) {
  res.render('member');
});
app.use(router)

// Routers.forEach(route => {
//   app.use(route);
// });

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
