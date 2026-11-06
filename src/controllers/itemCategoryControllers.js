import createError from 'http-errors';

import db from '../db/models/index.js';

class ItemCategoryController {
  async getAllItemCategories(req, res, next) {
    try {
      const itemCategories = await db.ItemCategory.findAll({ raw: true });
      if (!itemCategories.length) throw createError(404, 'Item categories not found!');
      return res.json(itemCategories);
    } catch (error) {
      next(error);
    }
  }

  async getItemCategoryById(req, res, next) {
    try {
      const itemCategory = await db.ItemCategory.findByPk(req.params.itemCategoryId);
      if (!itemCategory) throw createError(404, 'ItemCategory not found!');
      return res.json(itemCategory);
    } catch (error) {
      next(error);
    }
  }

  async createItemCategory(req, res, next) {
    try {
      const createdItemCategory = await db.ItemCategory.create(req.body, { raw: true });
      return res.json(createdItemCategory);
    } catch (error) {
      next(error);
    }
  }

  async updateItemCategory(req, res, next) {
    try {
      const updatedItemCategory = await db.ItemCategory.update(req.body, {
        where: { id: req.params.itemCategoryId },
        returning: true,
      });
      return res.json(...updatedItemCategory[1]);
    } catch (error) {
      next(error);
    }
  }

  async deleteItemCategory(req, res, next) {
    try {
      const deletedItemCategoriesCount = await db.ItemCategory.destroy({
        where: { id: req.params.itemCategoryId },
      });
      if (deletedItemCategoriesCount) {
        return res.json(Number(req.params.itemCategoryId));
      } else {
        throw createError(404, 'Item category not found!');
      }
    } catch (error) {
      next(error);
    }
  }
}

export const itemCategoryController = new ItemCategoryController();
