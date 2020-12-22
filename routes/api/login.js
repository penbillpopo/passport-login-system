var express = require('express');
var router = express.Router();

module.exports = function(passport){
    router.get('/login', function (req, res, next) {
      res.render('login');
    });
    router.post('/login', passport.authenticate('local', { successRedirect: '/member',failureRedirect:'/login',failureFlash:true }));
    return router;
};
