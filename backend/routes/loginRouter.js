//To handle loginm register, logout routes
const express =require('express');
const passport=require('passport')
const {User}=require('../models');

const router = express.Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', //로그인시 화면 
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/register', async(req, res)=>{
    try{
        const {user_Id, user_pw, user_name}= req.body;
        const hashedPassword= User.hashPassword(user_pw);
        const newUser= await User.create({
            user_Id,
            user_pw: hashedPassword,
            user_name
        });
        res.redirect('/login');
    }catch(err){
        res.status(400).send("Error registering new user")
    }
});

router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/login')
})

module.exports = router;
