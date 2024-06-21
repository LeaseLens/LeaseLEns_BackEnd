const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); // 사용자의 id를 세션에 저장
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id }}); // 세션에 저장된 id를 이용해 사용자 정보 조회
      done(null, user); // 조회된 사용자 정보를 req.user에 저장
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local(); // 로컬 전략 초기화
};
