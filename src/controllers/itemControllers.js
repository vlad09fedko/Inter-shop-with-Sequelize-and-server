import createError from 'http-errors';

import db from '../db/models/index.js';

class ItemController {
  async getAllItems(req, res, next) {
    try {
      const items = await db.Item.findAll({
        raw: true,
        limit: 10,
        offset: req.query.offset || 0,
      });
      if (!items.length) throw createError(404, 'Items not found!');
      return res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getItemById(req, res, next) {
    try {
      const item = await db.Item.findByPk(req.params.itemId);
      if (!item) throw createError(404, 'Item not found!');
      return res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async createItem(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const createdItem = await db.Item.create(req.body, {
        raw: true,
        transaction: t,
      });
      await t.commit();
      return res.json(createdItem);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async updateItem(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const updatedItem = await db.Item.update(req.body, {
        where: { id: req.params.itemId },
        returning: true,
        transaction: t,
      });
      await t.commit();
      return res.json(...updatedItem[1]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const deletedItemsCount = await db.Item.destroy({
        where: { id: req.params.itemId },
        transaction: t,
      });
      if (deletedItemsCount) {
        await t.commit();
        return res.json(deletedItemsCount);
      }
      throw createError(404, 'Item not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

export const itemController = new ItemController();
