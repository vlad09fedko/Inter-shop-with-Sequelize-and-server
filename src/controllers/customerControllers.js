import createError from 'http-errors';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import db from '../db/models/index.js';

class CustomerController {
  saltRounds = 5;

  async getAllCustomers(req, res, next) {
    try {
      const customer = await db.Customer.findAll({
        raw: true,
        limit: 10,
        offset: req.query.offset || 0,
      });
      if (!customer.length) throw createError(404, 'Customers not found!');
      return res.json(customer);
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
}

export const customerController = new CustomerController();
