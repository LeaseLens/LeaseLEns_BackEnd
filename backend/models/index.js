const Sequelize = require('sequelize');
const comment = require('./comment');
const product = require('./product');
const review  = require('./review');
const user = require('./user');

const env = process.env.NODE_ENV || 'yerim';
const config = require('../config/config')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

const db = {};

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

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;