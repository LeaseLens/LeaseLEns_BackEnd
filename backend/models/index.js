const Sequelize = require('sequelize');
const comment = require('./comment');
const product = require('./product');
const review  = require('./review');
const user = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Comment = comment;
db.User = user;
db.Product = product;
db.Review = review;

Object.keys(db).forEach(modelName =>{
  db[modelName].init(sequelize);
})

Object.keys(db).forEach(modelName =>{
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;