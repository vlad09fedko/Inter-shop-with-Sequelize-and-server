'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      categ_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'item_categories',
          key: 'id',
        },
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'item_types',
          key: 'id',
        },
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'brands',
          key: 'id',
        },
      },
      model_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'item_models',
          key: 'id',
        },
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'stores',
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  },
};
