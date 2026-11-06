import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Item extends Model {
  static associate(models) {
    Item.belongsTo(models.Brand, { as: 'brand', foreignKey: 'brand_id' });
    Item.belongsTo(models.ItemCategory, {
      as: 'categ',
      foreignKey: 'categ_id',
    });
    Item.belongsTo(models.ItemType, { as: 'type', foreignKey: 'type_id' });
    Item.belongsTo(models.ItemModel, { as: 'model', foreignKey: 'model_id' });
    Item.belongsTo(models.Store, { as: 'store', foreignKey: 'store_id' });
    Item.belongsToMany(models.Order, {
      through: models.ItemOrder,
      foreignKey: 'item_id',
      other_key: 'order_id',
      as: 'orders',
    });
  }

  static init(sequelize, DataTypes) {
    return super.init(
      {
        categ_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        brand_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        model_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        store_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Item',
        tableName: 'items',
        underscored: true,
      },
    );
  }
}
