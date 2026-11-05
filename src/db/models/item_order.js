import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ItemOrder extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'items',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'item_order',
    schema: 'public',
    timestamps: false
  });
  }
}
