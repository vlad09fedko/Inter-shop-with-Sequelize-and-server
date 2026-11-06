import { Router } from 'express';

import {itemTypeController} from '../controllers/index.js';
import { validateItemType } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(itemTypeController.getAllItemTypes)
  .post(validateItemType, itemTypeController.createItemType)
  .put(validateItemType, itemTypeController.updateItemType);

router
  .route('/:itemTypeId')
  .get(itemTypeController.getItemTypeById)
  .delete(itemTypeController.deleteItemType);

export default router;
