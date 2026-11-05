import { Router } from 'express';

import itemTypeController from '../controllers/itemTypeController.js';
import { validateItemType } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(itemTypeController.getItemTypes)
  .post(validateItemType, itemTypeController.createItemType)
  .put(validateItemType, itemTypeController.updateItemType);

router
  .route('/:itemTypeId')
  .get(itemTypeController.getItemTypeById)
  .delete(itemTypeController.deleteItemType);

export default router;
