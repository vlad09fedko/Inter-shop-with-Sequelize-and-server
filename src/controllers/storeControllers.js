import createError from 'http-errors';

import db from '../db/models/index.js';
import { Op } from 'sequelize';

class StoreController {
  async getAllStores(req, res, next) {
    try {
      const { store, offset } = req.query;

      const storesTitles = store
        ? Array.isArray(store)
          ? store
          : [store]
        : null;

      const stores = await db.Store.findAll({
        raw: true,
        limit: 10,
        offset: offset || 0,
        ...(storesTitles && {
          where: {
            title: {
              [Op.in]: storesTitles,
            },
          },
        }),
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
    const t = await db.sequelize.transaction();
    try {
      const createdStore = await db.Store.create(req.body, {
        raw: true,
        transaction: t,
      });
      await t.commit();
      return res.json(createdStore);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async updateStore(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const updatedStore = await db.Store.update(req.body, {
        where: { id: req.params.storeId },
        returning: true,
        transaction: t,
      });
      await t.commit();
      return res.json(...updatedStore[1]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async deleteStore(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const store = req?.query?.store || undefined;
      const storeId = req?.params?.storeId || undefined;

      const storesTitles = store
        ? Array.isArray(store)
          ? store
          : [store]
        : null;

      let deletedStoresCount = 0;
      if (storeId) {
        deletedStoresCount += await db.Store.destroy({
          where: { id: storeId },
          transaction: t,
        });
      }
      if (storesTitles) {
        deletedStoresCount += await db.Store.destroy({
          where: { title: { [Op.in]: storesTitles } },
          transaction: t,
        });
      }

      if (deletedStoresCount) {
        await t.commit();
        return res.json(deletedStoresCount);
      }
      throw createError(404, 'Store not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

export const storeController = new StoreController();
