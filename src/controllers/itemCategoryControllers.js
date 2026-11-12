import createError from 'http-errors';

import db from '../db/models/index.js';

class ItemCategoryController {
  async getAllItemCategories(req, res, next) {
    try {
      const itemCategories = await db.ItemCategory.findAll({
        raw: true,
        limit: 10,
        offset: req.query.offset || 0,
      });
      if (!itemCategories.length)
        throw createError(404, 'Item categories not found!');
      return res.json(itemCategories);
    } catch (error) {
      next(error);
    }
  }

  async getItemCategoryById(req, res, next) {
    try {
      const itemCategory = await db.ItemCategory.findByPk(
        req.params.itemCategoryId,
      );
      if (!itemCategory) throw createError(404, 'ItemCategory not found!');
      return res.json(itemCategory);
    } catch (error) {
      next(error);
    }
  }

  async createItemCategory(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const createdItemCategory = await db.ItemCategory.create(req.body, {
        raw: true,
        transaction: t,
      });
      await t.commit();
      return res.json(createdItemCategory);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async updateItemCategory(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const updatedItemCategory = await db.ItemCategory.update(req.body, {
        where: { id: req.params.itemCategoryId },
        returning: true,
        transaction: t,
      });
      await t.commit();
      return res.json(...updatedItemCategory[1]);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  async deleteItemCategory(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const deletedItemCategoriesCount = await db.ItemCategory.destroy({
        where: { id: req.params.itemCategoryId },
        transaction: t,
      });
      if (deletedItemCategoriesCount) {
        await t.commit();
        return res.json(deletedItemCategoriesCount);
      }
      throw createError(404, 'Item category not found!');
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
}

export const itemCategoryController = new ItemCategoryController();
