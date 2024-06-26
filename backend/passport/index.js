const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  // 사용자 객체를 세션에 저장할 때 호출.
  passport.serializeUser((user, done) => {
    console.log('serializeUser:', user);
    done(null, user.user_index); // 사용자의 id를 세션에 저장
  });

  passport.deserializeUser(async (user_index, done) => {
    try {
      const user = await User.findOne({ where: { user_index }}); // 세션에 저장된 id를 이용해 사용자 정보 조회
      console.log('deserializeUser:', user);
      done(null, user); // 조회된 사용자 정보를 req.user에 저장
    } catch (err) {
      done(err);
    }
  });

  local(); // 로컬 전략 초기화
};