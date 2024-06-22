const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
const { findOne } = require("../models/comment");
const handleError = require("../Middlewares/handleError");

//회원가입
exports.register = async (req, res) => {
  const { user_name, user_ID, user_pw, confirm_pw } = req.body;
  if (user_pw !== confirm_pw) {
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다" });
  }
  try {
    const existingUser = await User.findOne({ where: { user_ID } });
    if (existingUser) {
      return res.status(400).json({ message: "사용 중인 아이디입니다" });
    }

    const hashedPassword = await bcrypt.hash(user_pw, 10);
    const newUser = await User.create({
      user_ID,
      user_name,
      user_pw: hashedPassword,
      user_points: 0, //초기 포이트 0으로 설정
    });
    res.status(201).json({ message: "회원 가입 성공", user: newUser });
  } catch (error) {
    handleError(error, req, res);
  }
};

//로그인
exports.login = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return handleError(err, req, res);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    return res.login(user, (loginErr) => {
      if (loginErr) {
        return handleError(loginErr, req, res);
      }
      return res.status(200).json({ message: "로그인 성공", user });
    });
  })(req, res, next);
};

//로그아웃
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "로그아웃 중 오류가 발생했습니다." });
    }
    req.session.destroy();
    res.status(200).json({ message: "로그아웃 성공" });
  });
};

exports.quit = async (req, res) => {
  try {
    const userId = req.user.user_index;
    await User.destroy({ where: { user_index: userId } });
    req.logout(function (err) {
      if (err) {
        return handleError(err, req, res);
      }

      req.session.destroy((err) => {
        if (err) {
          return handleError(err, req, res);
        }
        res.status(200).json({ message: "회원탈퇴 성공" });
      });
    });
  } catch (error) {
    handleError(error, req, res);
  }
};
