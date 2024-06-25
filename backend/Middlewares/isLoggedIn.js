module.exports = (req, res, next) => {
  console.log('isAuthenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).json({
        code: 401,
        message: '로그인이 필요합니다',
        error: {}
      })
    }
  };
  