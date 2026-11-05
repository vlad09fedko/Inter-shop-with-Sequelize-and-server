import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Customer extends Model {
  static associate(models) {
    Customer.hasMany(models.Order, { as: 'orders', foreignKey: 'customer_id' });
  }
  
  static init(sequelize, DataTypes) {
    return super.init(
      {
        full_name: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: true,
          validate: {
            isEmail: true,
          }
        },
        password_hash: {
          type: DataTypes.TEXT,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        underscored: true,
      },
    );
  }
}
