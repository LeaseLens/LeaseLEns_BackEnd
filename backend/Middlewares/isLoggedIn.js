module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).send('로그인이 필요합니다.');
    }
  };
  