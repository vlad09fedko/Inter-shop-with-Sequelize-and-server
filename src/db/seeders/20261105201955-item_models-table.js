'use strict';

import { faker } from '@faker-js/faker';

export default {
  async up(queryInterface, Sequelize) {
    const brandIds = (
      await queryInterface.sequelize.query('SELECT id FROM brands', {
        type: Sequelize.QueryTypes.SELECT,
      })
    ).map(brand => brand.id);

    const models = [];
    const now = new Date();

    for (let i = 0; i < 50; i++) {
      models.push({
        title: `${faker.commerce.productName()}${i}`,
        brand_id: faker.helpers.arrayElement(brandIds),
        description: faker.lorem.sentence(),
        created_at: now,
        updated_at: now,
      });
    }

    await queryInterface.bulkInsert('item_models', models);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_models', null);
  },
};
