import { Router } from 'express';

import { itemTypeController } from '../controllers/index.js';
import { validateItemType } from '../middleware/index.js';

const router = new Router();

router
  .route('/')
  .get(itemTypeController.getAllItemTypes)
  .post(validateItemType, itemTypeController.createItemType);

router
  .route('/:itemTypeId')
  .get(itemTypeController.getItemTypeById)
  .put(validateItemType, itemTypeController.updateItemType)
  .delete(itemTypeController.deleteItemType);

export default router;
