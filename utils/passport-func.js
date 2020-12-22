// var User = require('../models').User

const authenticated = (req, res, next) => {
    // User.findAll({
    //   where:{
    //     id:req.session.passport.user
    //   }
    // }).then(async(userArr) => {
    //     let user = null;
    //     if(userArr.length>0){
    //         user = userArr[0]
    //     }
    //     if (req.isAuthenticated()&& await bcrypt.compare(user.account, user.is_login_key)) {
    //       return next();
    //     }
    //     return res.redirect('/login');
    //   });
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login');
};
const notAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/member');
};
module.exports = {authenticated,notAuthenticated};