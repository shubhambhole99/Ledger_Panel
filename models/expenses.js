module.exports = function(sequelize, DataTypes) {
    const Expenses = sequelize.define(
      'Expenses',
      {
        expense_id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        date: {
          type: DataTypes.DATE
        },
        bought_by: {
          type: DataTypes.STRING
        },
        total_amount: {
          type: DataTypes.DECIMAL(10, 2)
        }
      },
      {
        freezeTableName: true,
        timestamps: false,
        underscored: true
      }
    );
  
    Expenses.associate = (models) => {
      Expenses.hasMany(models.Purchases, {
        foreignKey: 'expense_id'
      });
    };
  
    return Expenses;
  };