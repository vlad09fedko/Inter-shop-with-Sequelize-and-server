import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ItemOrder extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        item_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        order_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'ItemOrder',
        tableName: 'item_orders',
        underscored: true,
      },
    );
  }
}
