import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Brand extends Model {
  static associate(models) {
    Brand.hasMany(models.Item, { as: 'items', foreignKey: 'brand_id' });
    Brand.hasMany(models.ItemModel, { as: 'models', foreignKey: 'brand_id' });
  }

  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        ModelName: 'Brand',
        tableName: 'brands',
        underscored: true,
      },
    );
  }
}
