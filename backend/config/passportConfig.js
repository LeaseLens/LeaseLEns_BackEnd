
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'user_ID',
        passwordField: 'user_pw'
    }, async (user_ID, user_pw, done) => {
        try {
            const user = await User.findOne({ where: { user_ID } });
            if (!user) {
                return done(null, false, { message: '존재하지 않는 사용자입니다 || Incorrect username.' });
            }
            if (!user.validatePassword(user_pw)) {
                return done(null, false, { message: '비밀번호가 틀렸습니다 || Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.user_index);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
