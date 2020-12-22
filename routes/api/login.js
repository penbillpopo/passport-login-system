var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
var User = require('../../models').User


router.get('/login', function (req, res, next) {
    res.render('login');
});
// router.post('/login', async function (req, res, next) {
//     try {
//     } catch (error) {
//         res.render('login', { error: 'login fail' });
//     }
// });

module.exports = router;
