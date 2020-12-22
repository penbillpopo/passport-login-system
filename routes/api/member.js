const express = require('express');
const router = express.Router();
const {authenticated} = require('../../utils/passport-func')


router.get('/member',authenticated, function (req, res, next) {
  res.render('member');
});

module.exports = router