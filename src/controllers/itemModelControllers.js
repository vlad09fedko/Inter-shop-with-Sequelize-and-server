import createError from 'http-errors';

import db from '../db/models/index.js';

class ItemModelController {
  async getAllItemModels(req, res, next) {
    try {
      const itemModels = await db.ItemModel.findAll({
        raw: true,
        limit: 10,
        offset: req.query.offset || 0,
      });
      if (!itemModels.length) throw createError(404, 'Item models not found!');
      return res.json(itemModels);
    } catch (error) {
      next(error);
    }
  }

  async getItemModelById(req, res, next) {
    try {
      const itemModel = await db.ItemModel.findByPk(req.params.itemModelId);
      if (!itemModel) throw createError(404, 'Item model not found!');
      return res.json(itemModel);
    } catch (error) {
      next(error);
    }
  }

  async createItemModel(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const createdItemModel = await db.ItemModel.create(req.body, {
        raw: true,
        transaction: t,
      });
      await t.commit();
      return res.json(createdItemModel);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async updateItemModel(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const updatedItemModel = await db.ItemModel.update(req.body, {
        where: { id: req.params.itemModelId },
        returning: true,
        transaction: t,
      });
      await t.commit();
      return res.json(...updatedItemModel[1]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async deleteItemModel(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const deletedItemModelsCount = await db.ItemModel.destroy({
        where: { id: req.params.itemModelId },
        transaction: t,
      });
      if (deletedItemModelsCount) {
        return res.json(deletedItemModelsCount);
        await t.commit();
      }
      throw createError(404, 'Item model not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

export const itemModelController = new ItemModelController();
