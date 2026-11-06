import createError from 'http-errors';

import db from '../db/models/index.js';

class StoreController {
  async getAllStores(req, res, next) {
    try {
      const stores = await db.Store.findAll({
        raw: true,
        limit: 10,
        offset: req.query.offset || 0,
      });
      if (!stores.length) throw createError(404, 'Stores not found!');
      return res.json(stores);
    } catch (error) {
      next(error);
    }
  }

  async getStoreById(req, res, next) {
    try {
      const store = await db.Store.findByPk(req.params.storeId);
      if (!store) throw createError(404, 'Store not found!');
      return res.json(store);
    } catch (error) {
      next(error);
    }
  }

  async createStore(req, res, next) {
    try {
      const createdStore = await db.Store.create(req.body, { raw: true });
      return res.json(createdStore);
    } catch (error) {
      next(error);
    }
  }

  async updateStore(req, res, next) {
    try {
      const updatedStore = await db.Store.update(req.body, {
        where: { id: req.params.storeId },
        returning: true,
      });
      return res.json(...updatedStore[1]);
    } catch (error) {
      next(error);
    }
  }

  async deleteStore(req, res, next) {
    try {
      const deletedStoresCount = await db.Store.destroy({
        where: { id: req.params.storeId },
      });
      if (deletedStoresCount) {
        return res.json(Number(req.params.storeId));
      } else {
        throw createError(404, 'Store not found!');
      }
    } catch (error) {
      next(error);
    }
  }
}

export const storeController = new StoreController();
