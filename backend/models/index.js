const Sequelize = require('sequelize');
const comment = require('./comment');
const product = require('./product');
const review  = require('./review');
const User = require('./user');

const env = process.env.NODE_ENV || 'yerim';
///const config = require('../config/config')[env];
//const sequelize = new Sequelize(config.database, config.username, config.password, config);
//위의 두 줄을 짧게 쓰면
const config = require('../config/config');
const sequelize=new Sequelize(config[env]);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User= User.init(sequelize)

db.Comment = comment;
db.User = user;
db.Product = product;
db.Review = review;
User.associate(db);

Object.keys(db).forEach(modelName =>{
  db[modelName].init(sequelize);
})

Object.keys(db).forEach(modelName =>{
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});



module.exports = db;