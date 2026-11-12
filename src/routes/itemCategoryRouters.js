import { Router } from 'express';

import { itemCategoryController } from '../controllers/index.js';
import { validateItemCategory } from '../middleware/index.js';

const router = new Router();

router
  .route('/')
  .get(itemCategoryController.getAllItemCategories)
  .post(validateItemCategory, itemCategoryController.createItemCategory);

router
  .route('/:itemCategoryId')
  .get(itemCategoryController.getItemCategoryById)
  .put(validateItemCategory, itemCategoryController.updateItemCategory)
  .delete(itemCategoryController.deleteItemCategory);

export default router;
