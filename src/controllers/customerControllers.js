import createError from 'http-errors';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

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
    try {
      const salt = genSaltSync(this.saltRounds);
      const password_hash = hashSync(req.body.password_hash, salt);
      const values = { ...req.body, password_hash };

      const createdCustomer = await db.Customer.create(values, { raw: true });
      return res.json(createdCustomer);
    } catch (error) {
      next(error);
    }
  };

  updateCustomer = async (req, res, next) => {
    try {
      const salt = genSaltSync(this.saltRounds);
      const password_hash = hashSync(req.body.password_hash, salt);
      const values = { ...req.body, password_hash };

      const updatedCustomer = await db.Customer.update(values, {
        where: { id: req.params.customerId },
        returning: true,
      });
      return res.json(...updatedCustomer[1]);
    } catch (error) {
      next(error);
    }
  };

  async deleteCustomer(req, res, next) {
    try {
      const { password_hash } = await db.Customer.findByPk(
        req.params.customerId,
      );
      if (!compareSync(req.body.password_hash, password_hash))
        throw createError(401, 'Incorrect password!');

      const deletedCustomersCount = await db.Customer.destroy({
        where: { id: req.params.customerId },
      });

      if (deletedCustomersCount) {
        return res.json(deletedCustomersCount);
      } else {
        throw createError(404, 'Customer not found!');
      }
    } catch (error) {
      next(error);
    }
  }

  async getCustomerWithMostOrders(req, res, next) {
    try {
      const customers = await db.Customer.findAll({
        raw: true,
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
      if (!resCustomers.length) throw createError(404, 'Customers not found!');
      return res.json(resCustomers);
    } catch (error) {
      next(error);
    }
  }

  async getCustomerWithMostExpensiveItem(req, res, next) {
    try {
      const customers = await db.Customer.findAll({
        raw: true,
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
      if (!resCustomers.length) throw createError(404, 'Customers not found!');
      return res.json(resCustomers);
    } catch (error) {
      next(error);
    }
  }
}

export const customerController = new CustomerController();
