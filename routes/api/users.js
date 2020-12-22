var express = require('express');
var router = express.Router();
var User = require('../../models').User

router.get('/users', function (req, res, next) {
  (async () => {
    let user = await User.findAll({
      where: {
        name: 'Bill'
      }
    });
    console.log(`find ${user.length}:`);
    for (let u of user) {
      console.log(JSON.stringify(u));
    }
  })();
});

module.exports = router;
