'use strict';

import { faker } from '@faker-js/faker';

export default {
  async up(queryInterface, Sequelize) {
    const models = [];
    const now = new Date();

    for (let i = 0; i < 50; i++) {
      models.push({
        title: faker.commerce.productName(),
        brand_id: faker.number.int({ min: 1, max: 50 }),
        description: faker.lorem.sentence(),
        created_at: now,
        updated_at: now,
      });
    }

    await queryInterface.bulkInsert('item_models', models, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_models', null, {});
  },
};
