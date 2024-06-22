const passport = require('passport');
const local = require('./local');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.user_ID); // 사용자의 id를 세션에 저장
  });

  passport.deserializeUser(async (user_ID, done) => {
    try {
      const user = await User.findOne({ where: { user_ID }}); // 세션에 저장된 id를 이용해 사용자 정보 조회
      done(null, user); // 조회된 사용자 정보를 req.user에 저장
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local(); // 로컬 전략 초기화
};