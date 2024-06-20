const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.register = async (req, res) => {
  
  const { user_name, user_ID, user_pw, confirmPassword } = req.body;
  console.log("Request body:", req.body); // 디버깅을 위해 추가

  if (!user_name || !user_ID || !user_pw || !confirmPassword) {
    console.log(user_name, user_ID, user_pw, confirmPassword)
    return res.status(400).json({ message: "All fields are required" });
  }

  if (user_pw !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(user_pw, 10);

  try {
    const user = await User.create({
      user_name,
      user_ID,
      user_pw: hashedPassword,
      user_points: 0
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error.message); // 디버깅을 위해 추가
    res.status(400).json({message: `status 400 {error.message}` });
  }
};

exports.login = async (req, res) => {
  console.log("Request body:", req.body); // 디버깅을 위해 추가

  const { user_ID, user_pw } = req.body;

  try {
    const user = await User.findOne({ where: { user_ID } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(user_pw, user.user_pw);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error:", error.message); // 디버깅을 위해 추가
    res.status(400).json({ message: error.message });
  }
};
