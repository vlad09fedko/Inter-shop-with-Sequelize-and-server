'use strict';

import { faker } from '@faker-js/faker';

export default {
  async up(queryInterface, Sequelize) {
    const itemOrders = [];

    for (let i = 0; i < 100; i++) {
      itemOrders.push({
        item_id: faker.number.int({ min: 1, max: 100 }),
        order_id: faker.number.int({ min: 1, max: 100 })
      });
    }

    const uniqueItemOrders = itemOrders.filter((v, i, a) => 
      a.findIndex(t => (t.item_id === v.item_id && t.order_id === v.order_id)) === i
    );

    while (uniqueItemOrders.length < 100) {
        const newItemOrder = {
            item_id: faker.number.int({ min: 1, max: 100 }),
            order_id: faker.number.int({ min: 1, max: 100 })
        };
        if (!uniqueItemOrders.some(uo => uo.item_id === newItemOrder.item_id && uo.order_id === newItemOrder.order_id)) {
            uniqueItemOrders.push(newItemOrder);
        }
    }

    await queryInterface.bulkInsert('item_orders', uniqueItemOrders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_orders', null);
  }
};