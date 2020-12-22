var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
var User = require('../../models').User


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

module.exports = router;
