const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model{
  static init(sequelize){
    return super.init(
      {
        user_index: {
          type: DataTypes.INTEGER,
          allowNull:false,
          autoIncrement:true,
          primaryKey:true,
        },
        user_ID:{
          type: DataTypes.STRING,
          allowNull:false,
          unique:true,
        },
        user_name:{
          type:DataTypes.STRING,
          allowNull:false,
        },
        user_points:{
          type: DataTypes.INTEGER,
          allowNull:false,
          defaultValue:0
        },
      },
      {
        sequelize,
        modelName:'User',
        tableName:'users',
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci',
      });
  }
static associate(db){
  db.User.hasMany(db.Review, {foreignKey:'user_index'});
  db.User.hasMany(db.Comment, {foreignKey:'user_index'});
  db.User.belongsToMany(db.Product, {through:'favorites' , foreignKey:'user_index'})
  }
}