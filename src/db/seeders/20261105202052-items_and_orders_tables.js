'use strict';

import { faker } from '@faker-js/faker';

export default {
  async up(queryInterface, Sequelize) {
    const items = [],
      orders = [];
    const now = new Date();

    for (let i = 0; i < 50; i++) {
      // Items
      items.push({
        categ_id: faker.number.int({ min: 1, max: 50 }),
        type_id: faker.number.int({ min: 1, max: 50 }),
        brand_id: faker.number.int({ min: 1, max: 50 }),
        model_id: faker.number.int({ min: 1, max: 50 }),
        price: faker.commerce.price({ min: 10, max: 2000, dec: 2 }),
        store_id: faker.number.int({ min: 1, max: 50 }),
        amount: faker.number.int({ min: 0, max: 500 }),
        created_at: now,
        updated_at: now,
      });

      // Orders
      orders.push({
        code: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
        date: faker.date.recent({ days: 30 }),
        customer_id: faker.number.int({ min: 1, max: 50 }),
        amount: faker.commerce.price({ min: 50, max: 5000, dec: 2 }),
        paid: faker.datatype.boolean(),
        created_at: now,
        updated_at: now,
      });
    }

    await queryInterface.bulkInsert('items', items, {});
    await queryInterface.bulkInsert('orders', orders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
    await queryInterface.bulkDelete('items', null, {});
  },
};
