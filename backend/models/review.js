const DataTypes = require('sequelize');
const {Model} = DataTypes;

module.exports = class Review extends Model{
  static init(sequelize){
    return super.init({
      rev_index:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
      },
      rev_isAuth:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
      },
      rev_text : {
        type:DataTypes.TEXT,
        allowNull:false,
      },
      rev_createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
      },
      rev_img:{
        type:DataTypes.BLOB('long'),
        allowNull:true,
      },
      rev_authImg:{
        type:DataTypes.BLOB('long'),
        allowNull:false,
      },
      rev_title:{
        type:DataTypes.TEXT,
        allowNull:false,
      },
      rev_rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
    },
    {
      sequelize,
      modelName:'Review',
      tableName:'reviews',
      charset:'utf8mb4',
      collate:'utf8mb4_general_ci',
    });
  }
  static associate(db){
    db.Review.hasMany(db.Comment);
  }
}