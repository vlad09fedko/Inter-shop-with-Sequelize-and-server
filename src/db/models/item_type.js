import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ItemType extends Model {
  static associate(models) {
    ItemType.hasMany(models.Item, { as: 'items', foreignKey: 'type_id' });
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
        modelName: 'ItemType',
        tableName: 'item_types',
        underscored: true,
      },
    );
  }
}
