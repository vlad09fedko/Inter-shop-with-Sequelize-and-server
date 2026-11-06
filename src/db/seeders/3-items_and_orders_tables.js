'use strict';

import { faker } from '@faker-js/faker';

export default {
  async up(queryInterface, Sequelize) {
    const getIds = async tableName =>
      (
        await queryInterface.sequelize.query(`SELECT id FROM ${tableName}`, {
          type: Sequelize.QueryTypes.SELECT,
        })
      ).map(obj => obj.id);

    const items = [],
      orders = [];
    const now = new Date();

    const categIds = await getIds('item_categories');
    const typeIds = await getIds('item_types');
    const brandIds = await getIds('brands');
    const modelIds = await getIds('item_models');
    const storeIds = await getIds('stores');
    const customerIds = await getIds('customers');

    for (let i = 0; i < 50; i++) {
      // Items
      items.push({
        categ_id: faker.helpers.arrayElement(categIds),
        type_id: faker.helpers.arrayElement(typeIds),
        brand_id: faker.helpers.arrayElement(brandIds),
        model_id: faker.helpers.arrayElement(modelIds),
        price: faker.commerce.price({ min: 10, max: 2000, dec: 2 }),
        store_id: faker.helpers.arrayElement(storeIds),
        amount: faker.number.int({ min: 0, max: 500 }),
        created_at: now,
        updated_at: now,
      });

      // Orders
      orders.push({
        code: faker.string.alphanumeric({ length: 10, casing: 'upper' }),
        customer_id: faker.helpers.arrayElement(customerIds),
        amount: faker.commerce.price({ min: 50, max: 5000, dec: 2 }),
        paid: faker.datatype.boolean(),
        created_at: now,
        updated_at: now,
      });
    }

    await queryInterface.bulkInsert('items', items);
    await queryInterface.bulkInsert('orders', orders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null);
    await queryInterface.bulkDelete('items', null);
  },
};
