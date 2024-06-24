const { User } = require('./models');
const bcrypt = require('bcrypt');

module.exports = class AdminSetup{
    constructor() {}
    async createAdmin(){
        try{
            const adminExist= await User.findOne({ where : { user_ID: 'admin'} });
            if(!adminExist){
                const hashedPassword = await bcrypt.hash('adminpassword', 10);
                await User.create({
                    user_ID:'admin',
                    user_name: 'Administrator',
                    user_pw: hashedPassword,
                    role: 'admin',
                });
                console.log("Admin account created");
            }else {
                console.log('Admin account already exists');
            }
        }catch (error){
            console.error("Error creating admin account: ", error);
        }
    }
}
