const {Strategy: LocalStrategy} = require("passport-local");
const {userModel} = require("./model/user.model");
const { compareSync } = require("bcrypt");
function passportInit(passport){
    const authenticatedUser = async (username, password, done) => {
        try {
            const user = await userModel.findOne({username});
            if(!user) return done(null, false, {message: "not found user account!"});
            if(compareSync(password, user.password)){
                return done(null, user)
            }
            return done(null, false, {message: "username or password is incorrect"})
        } catch (error) {
            done(error)
        }
    }
    const localStrategy = new LocalStrategy({usernameField: "username", passwordField: "password"}, authenticatedUser);
    const serializeUser = passport.serializeUser((user, done) => {
        return done(null, user.id)
    });
    const deserializeUser = passport.deserializeUser(async (id, done) => {
        const user = await userModel.findOne({_id: id});
        if(!user) return done(null, false, {message: "not found user account!"});
        return done(null, user)
    });
    passport.use("local", localStrategy, serializeUser, deserializeUser)
}
module.exports = {
    passportInit
}