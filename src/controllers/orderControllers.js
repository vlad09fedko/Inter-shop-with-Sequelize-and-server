import createError from 'http-errors';

import db from '../db/models/index.js';

class OrderController {
  async getAllOrders(req, res, next) {
    try {
      const orders = await db.Order.findAll({
        raw: true,
        limit: 10,
        offset: req.query.offset || 0,
      });
      if (!orders.length) throw createError(404, 'Orders not found!');
      return res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const order = await db.Order.findByPk(req.params.orderId);
      if (!order) throw createError(404, 'Order not found!');
      return res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const createdOrder = await db.Order.create(req.body, {
        raw: true,
        transaction: t,
      });
      await t.commit();
      return res.json(createdOrder);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async updateOrder(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const updatedOrder = await db.Order.update(req.body, {
        where: { id: req.params.orderId },
        returning: true,
        transaction: t,
      });
      await t.commit();
      return res.json(...updatedOrder[1]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const deletedOrdersCount = await db.Order.destroy({
        where: { id: req.params.orderId },
        transaction: t,
      });
      if (deletedOrdersCount) {
        await t.commit();
        return res.json(deletedOrdersCount);
      }
      throw createError(404, 'Order not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

export const orderController = new OrderController();
