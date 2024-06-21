const express = require('express');
const passport = require('passport');
const { User } = require('../models'); // Ensure correct import path

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
    try {
        const { user_ID, user_pw, user_name } = req.body;
        const hashedPassword = User.hashPassword(user_pw);
        const newUser = await User.create({
            user_ID,
            user_pw: hashedPassword,
            user_name
        });
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Error registering new user.');
    }
});

// User login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).send('Incorrect username or password.');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.send('Logged in successfully');
        });
    })(req, res, next);
});

// User logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }
        res.send('Logged out successfully');
    });
});

module.exports = router;
