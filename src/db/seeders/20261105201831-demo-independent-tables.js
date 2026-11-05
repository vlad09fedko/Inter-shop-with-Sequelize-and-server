'use strict';

import { faker } from '@faker-js/faker';

export default {
  async up(queryInterface, Sequelize) {
    const brands = [],
      itemTypes = [],
      stores = [],
      customers = [],
      item_categories = [];
    const now = new Date();

    for (let i = 0; i < 50; i++) {
      // 1. brands
      brands.push({
        title: faker.company.name(),
        description: faker.commerce.productDescription(),
        created_at: now,
        updated_at: now,
      });

      // 2. item_types
      itemTypes.push({
        title: faker.commerce.department(),
        description: faker.lorem.sentence(),
        created_at: now,
        updated_at: now,
      });

      // 3. stores
      stores.push({
        title: `Store ${faker.company.name()}`,
        description: faker.location.streetAddress(),
        created_at: now,
        updated_at: now,
      });

      // 4. customers
      customers.push({
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        created_at: now,
        updated_at: now,
      });

      // 5. item_categories
      item_categories.push({
        title: faker.commerce.department(),
        description: faker.lorem.sentence(),
        created_at: now,
        updated_at: now,
      });
    }

    await queryInterface.bulkInsert('brands', brands, {});
    await queryInterface.bulkInsert('item_types', itemTypes, {});
    await queryInterface.bulkInsert('stores', stores, {});
    await queryInterface.bulkInsert('customers', customers, {});
    await queryInterface.bulkInsert('item_categories', item_categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_categories', null, {});
    await queryInterface.bulkDelete('customers', null, {});
    await queryInterface.bulkDelete('stores', null, {});
    await queryInterface.bulkDelete('item_types', null, {});
    await queryInterface.bulkDelete('brands', null, {});
  },
};
