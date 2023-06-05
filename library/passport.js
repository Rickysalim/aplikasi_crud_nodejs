const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { users } = require('../models');

async function authenticate(email, password, done) {
    try {
        const user = await users.authenticate({email, password});
        return done(null, user);
    } catch (error) {
        return done(null,false,{message:error.message})
    }
}

passport.use(new LocalStrategy({usernameField:"email", passwordField:"password"}, authenticate));

passport.serializeUser((user, done) => {
    return done(null,user);
})
passport.deserializeUser(async({id}, done) => {
    return done(null, await users.findByPk(id));
})

module.exports = passport;