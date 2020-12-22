var express = require('express');
var router = express.Router();

router.get('/member', function (req, res, next) {
  res.render('member');
});

module.exports = router