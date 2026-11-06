'use strict';

import { faker } from '@faker-js/faker';
import { genSaltSync, hashSync } from 'bcryptjs';

export default {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const salt = genSaltSync(5);

    const brands = [],
      itemTypes = [],
      stores = [],
      customers = [],
      item_categories = [];

    for (let i = 0; i < 50; i++) {
      // 1. brands
      brands.push({
        title: `${faker.company.name()}${i}`,
        description: faker.commerce.productDescription(),
        created_at: now,
        updated_at: now,
      });

      // 2. item_types
      itemTypes.push({
        title: `${faker.commerce.department()}${i}`,
        description: faker.lorem.sentence(),
        created_at: now,
        updated_at: now,
      });

      // 3. stores
      stores.push({
        title: `Store ${faker.company.name()} ${i}`,
        description: faker.location.streetAddress(),
        created_at: now,
        updated_at: now,
      });

      // 4. customers
      customers.push({
        full_name: faker.person.fullName(),
        email: `${faker.internet.email()}${i}`,
        password_hash: hashSync(
          faker.string.alphanumeric({ length: 10 }),
          salt,
        ),
        created_at: now,
        updated_at: now,
      });

      // 5. item_categories
      item_categories.push({
        title: `${faker.commerce.department()}${i}`,
        description: faker.lorem.sentence(),
        created_at: now,
        updated_at: now,
      });
    }

    await queryInterface.bulkInsert('brands', brands);
    await queryInterface.bulkInsert('item_types', itemTypes);
    await queryInterface.bulkInsert('stores', stores);
    await queryInterface.bulkInsert('customers', customers);
    await queryInterface.bulkInsert('item_categories', item_categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_categories', null);
    await queryInterface.bulkDelete('customers', null);
    await queryInterface.bulkDelete('stores', null);
    await queryInterface.bulkDelete('item_types', null);
    await queryInterface.bulkDelete('brands', null);
  },
};
