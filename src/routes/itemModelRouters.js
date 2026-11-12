import { Router } from 'express';

import { itemModelController } from '../controllers/index.js';
import { validateItemModel } from '../middleware/index.js';

const router = new Router();

router
  .route('/')
  .get(itemModelController.getAllItemModels)
  .post(validateItemModel, itemModelController.createItemModel);

router
  .route('/:itemModelId')
  .get(itemModelController.getItemModelById)
  .put(validateItemModel, itemModelController.updateItemModel)
  .delete(itemModelController.deleteItemModel);

export default router;
