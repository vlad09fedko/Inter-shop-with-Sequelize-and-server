const _sequelize = require('sequelize');
const { Model, Sequelize } = _sequelize;

module.exports = class ItemModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        brand_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'brands',
            key: 'id',
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'models',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'models_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      },
    );
  }
};
