const express = require('express');
const router = express.Router();
const {notAuthenticated} = require('../../utils/passport-func')

router.get('/',notAuthenticated, function (req, res, next) {
  res.render('home',{ title: 'Express' });
});

module.exports = router