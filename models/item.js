// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Item extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Item.init({
//     itemname: DataTypes.STRING,
//     price: DataTypes.DECIMAL
//   }, {
//     sequelize,
//     modelName: 'Item',
//   });
//   return Item;
// };


module.exports = function(sequelize, DataTypes) {
  const Item = sequelize.define(
    'Item',
    {
      item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      item_name: {
        type: DataTypes.STRING
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    { 
      freezeTableName: true,
      timestamps: false,
      underscored: true // Use snake_case for column names
    }
  );
  
  return Item;
};