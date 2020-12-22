var express = require('express');
var router = express.Router();

const {notAuthenticated} = require('../../utils/passport-func')

module.exports = function(passport){
    router.get('/login',notAuthenticated, function (req, res, next) {
      res.render('login');
    });    
    router.post('/login', passport.authenticate('local', { successRedirect: '/member',failureRedirect:'/login',failureFlash:true }),
    function(req, res) {
      // 在這先執行一些動作 code...
      res.redirect('/')
    });
    router.get('/logout',function (req, res, next) {
      req.logout();
      res.redirect('/login')
    }); 
    return router;
};
