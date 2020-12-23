var express = require('express');
var router = express.Router();
const {notAuthenticated} = require('../../utils/passport-func')

module.exports = function(passport){
    router.get('/login',notAuthenticated, function (req, res, next) {
      res.render('login');
    });    
    router.post('/login', passport.authenticate('local', { successRedirect: '/member',failureRedirect:'/login',failureFlash:true }));
    router.get('/logout',function (req, res, next) {
      req.logout();
      res.redirect('/login')
    }); 
    return router;
};
