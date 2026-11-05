import { Router } from 'express';

import itemCategoryController from '../controllers/itemCategoryController.js';
import { validateItemCategory } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(itemCategoryController.getItemCategories)
  .post(validateItemCategory, itemCategoryController.createItemCategory)
  .put(validateItemCategory, itemCategoryController.updateItemCategory);

router
  .route('/:itemCategoryId')
  .get(itemCategoryController.getItemCategoryById)
  .delete(itemCategoryController.deleteItemCategory);

export default router;
