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

    const itemOrders = [];

    const itemIds = await getIds('items');
    const orderIds = await getIds('orders');

    for (let i = 0; i < 50; i++) {
      itemOrders.push({
        item_id: faker.helpers.arrayElement(itemIds),
        order_id: faker.helpers.arrayElement(orderIds),
      });
    }

    const uniqueItemOrders = itemOrders.filter(
      (v, i, a) =>
        a.findIndex(
          t => t.item_id === v.item_id && t.order_id === v.order_id,
        ) === i,
    );

    while (uniqueItemOrders.length < 50) {
      const newItemOrder = {
        item_id: faker.helpers.arrayElement(itemIds),
        order_id: faker.helpers.arrayElement(orderIds),
      };
      if (
        !uniqueItemOrders.some(
          uo =>
            uo.item_id === newItemOrder.item_id &&
            uo.order_id === newItemOrder.order_id,
        )
      ) {
        uniqueItemOrders.push(newItemOrder);
      }
    }

    await queryInterface.bulkInsert('item_orders', uniqueItemOrders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('item_orders', null);
  },
};
