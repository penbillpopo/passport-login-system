const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


async function initialize(passport,getUserByAccount,getUserById) {
    const authenticateUser = async (account, password, done) => {
        const userArr = await getUserByAccount(account);
        let user = null;
        if(userArr.length>0){
            user = userArr[0]
        }
        if (user == null) {
            return done(null, false, { message: "no user" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Password incorrect" })
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'account' }, authenticateUser))
    passport.serializeUser((user, done) => done(null,user.id))
    passport.deserializeUser((id, done) => { 
        return done(null,getUserById(id))
    })
}
module.exports = initialize