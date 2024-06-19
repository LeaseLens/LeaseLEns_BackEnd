const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, username, password, confirmPassword } = req.body;

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // 새로운 사용자 생성
        const user = await User.create({
            name,
            username,
            password: hashedPassword
        });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
