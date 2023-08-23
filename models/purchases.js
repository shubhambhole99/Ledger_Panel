module.exports = function(sequelize, DataTypes) {
    const Purchases = sequelize.define(
      'Purchases',
      {
        purchase_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        item: {
          type: DataTypes.STRING
        },
        quantity: {
          type: DataTypes.INTEGER
        },
        price: {
          type: DataTypes.DECIMAL(10, 2)
        }
      },
      {
        freezeTableName: true,
        timestamps: false,
        underscored: true
      }
    );
  
    return Purchases;
  };