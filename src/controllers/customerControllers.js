import createError from 'http-errors';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

import db from '../db/models/index.js';
import { Sequelize } from 'sequelize';

class CustomerController {
  saltRounds = 5;

  async getAllCustomers(req, res, next) {
    try {
      const customers = await db.Customer.findAll({
        raw: true,
        limit: 10,
        offset: req.query.offset || 0,
      });
      if (!customers.length) throw createError(404, 'Customers not found!');
      return res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  async getCustomerById(req, res, next) {
    try {
      const customer = await db.Customer.findByPk(req.params.customerId);
      if (!customer) throw createError(404, 'Customer not found!');
      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  createCustomer = async (req, res, next) => {
    const t = await db.sequelize.transaction();
    try {
      const salt = genSaltSync(this.saltRounds);
      const password_hash = hashSync(req.body.password_hash, salt);
      const values = { ...req.body, password_hash };

      const createdCustomer = await db.Customer.create(values, {
        raw: true,
        transaction: t,
      });
      await t.commit();
      return res.json(createdCustomer);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  };

  updateCustomer = async (req, res, next) => {
    const t = await db.sequelize.transaction();
    try {
      const salt = genSaltSync(this.saltRounds);
      const password_hash = hashSync(req.body.password_hash, salt);
      const values = { ...req.body, password_hash };

      const updatedCustomer = await db.Customer.update(values, {
        where: { id: req.params.customerId },
        returning: true,
        transaction: t,
      });
      await t.commit();
      return res.json(...updatedCustomer[1]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  };

  async deleteCustomer(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const { password_hash } = await db.Customer.findByPk(
        req.params.customerId,
      );
      if (!compareSync(req.body.password_hash, password_hash))
        throw createError(401, 'Incorrect password!');

      const deletedCustomersCount = await db.Customer.destroy({
        where: { id: req.params.customerId },
        transaction: t,
      });

      if (deletedCustomersCount) {
        await t.commit();
        return res.json(deletedCustomersCount);
      }
      throw createError(404, 'Customer not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async getCustomerWithMostOrders(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const customers = await db.Customer.findAll({
        raw: true,
        transaction: t,
        order: [
          ['count_of_orders', 'DESC'],
          ['id', 'ASC'],
        ],
        attributes: [
          'id',
          'full_name',
          [
            db.sequelize.cast(
              db.sequelize.fn('COUNT', db.sequelize.col('customer_id')),
              'INTEGER',
            ),
            'count_of_orders',
          ],
        ],
        group: ['Customer.id', 'Customer.full_name'],
        include: [
          {
            model: db.Order,
            attributes: [],
            as: 'orders',
          },
        ],
      });
      const maxOfOrders = customers[0].count_of_orders;
      const resCustomers = customers.filter(
        customer => customer.count_of_orders === maxOfOrders,
      );
      if (resCustomers.length) {
        await t.commit();
        return res.json(resCustomers);
      }
      throw createError(404, 'Customers not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async getCustomerWithMostExpensiveItem(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const customers = await db.Customer.findAll({
        raw: true,
        transaction: t,
        order: [
          ['max_price', 'DESC'],
          ['id', 'ASC'],
        ],
        attributes: [
          'id',
          'full_name',
          [
            db.sequelize.fn('MAX', db.sequelize.col('orders->items.price')),
            'max_price',
          ],
        ],
        group: ['Customer.id', 'Customer.full_name'],
        include: [
          {
            model: db.Order,
            attributes: [],
            as: 'orders',
            required: true,
            include: [
              {
                model: db.Item,
                attributes: [],
                as: 'items',
                required: true,
                through: {
                  attributes: [],
                },
              },
            ],
          },
        ],
      });

      const maxPrice = customers[0].max_price;
      const resCustomers = customers.filter(
        customer => customer.max_price === maxPrice,
      );
      if (resCustomers.length) {
        await t.commit();
        return res.json(resCustomers);
      }
      throw createError(404, 'Customers not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

export const customerController = new CustomerController();
