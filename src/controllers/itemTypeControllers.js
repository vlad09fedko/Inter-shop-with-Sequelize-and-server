import createError from 'http-errors';

import db from '../db/models/index.js';

class ItemTypeController {
  async getAllItemTypes(req, res, next) {
    try {
      const itemTypes = await db.ItemType.findAll({
        raw: true,
        limit: 10,
        offset: req.query.offset || 0,
      });
      if (!itemTypes.length) throw createError(404, 'Item types not found!');
      return res.json(itemTypes);
    } catch (error) {
      next(error);
    }
  }

  async getItemTypeById(req, res, next) {
    try {
      const itemType = await db.ItemType.findByPk(req.params.itemTypeId);
      if (!itemType) throw createError(404, 'Item type not found!');
      return res.json(itemType);
    } catch (error) {
      next(error);
    }
  }

  async createItemType(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const createdItemType = await db.ItemType.create(req.body, {
        raw: true,
        transaction: t,
      });
      await t.commit();
      return res.json(createdItemType);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async updateItemType(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const updatedItemType = await db.ItemType.update(req.body, {
        where: { id: req.params.itemTypeId },
        returning: true,
        transaction: t,
      });
      await t.commit();
      return res.json(...updatedItemType[1]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async deleteItemType(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const deletedItemTypesCount = await db.ItemType.destroy({
        where: { id: req.params.itemTypeId },
        transaction: t,
      });
      if (deletedItemTypesCount) {
        await t.commit();
        return res.json(deletedItemTypesCount);
      }
      throw createError(404, 'Item type not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

export const itemTypeController = new ItemTypeController();
