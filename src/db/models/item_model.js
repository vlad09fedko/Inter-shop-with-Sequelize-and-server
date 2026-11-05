import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ItemModel extends Model {
  static associate(models) {
    ItemModel.belongsTo(models.Brand, { as: 'brand', foreignKey: 'brand_id' });
    ItemModel.hasMany(models.Item, { as: 'items', foreignKey: 'model_id' });
  }

  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        brand_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'ItemModel',
        tableName: 'item_models',
        underscored: true,
      },
    );
  }
}
