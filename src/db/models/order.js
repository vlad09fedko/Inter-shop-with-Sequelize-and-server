import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Orde extends Model {
  static associate(models) {
    Order.belongsTo(model.Customer, { as: 'customer', foreignKey: 'customer_id' });
    Order.belongsToMany(model.Item, {
      through: model.ItemOrder,
      foreignKey: 'order_id',
      other_key: 'item_id',
      as: 'items',
    });
  }

  static init(sequelize, DataTypes) {
    return super.init(
      {
        code: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        customer_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        paid: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        underscored: true,
      },
    );
  }
}
