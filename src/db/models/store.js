import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Store extends Model {
  static associate(models) {
    Store.hasMany(models.Item, {
      as: 'items',
      foreignKey: 'store_id',
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
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Store',
        tableName: 'stores',
        underscored: true,
      },
    );
  }
}
