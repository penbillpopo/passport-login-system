var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'register' });
});
router.post('/register', async function (req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.account, 10)
        console.log(await bcrypt.compare('12345', hashedPassword))
        next()
    } catch (error) {

    }
});

module.exports = router;
