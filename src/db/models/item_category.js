import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ItemCategory extends Model {
  static associate(models) {
    ItemCategory.hasMany(models.Item, {
      as: 'items',
      foreignKey: 'categ_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }

  static init(sequelize, DataTypes) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'ItemCategory',
        tableName: 'item_categories',
        underscored: true,
      },
    );
  }
}
