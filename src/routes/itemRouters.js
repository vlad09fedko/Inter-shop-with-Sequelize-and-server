import { Router } from 'express';

import { itemController } from '../controllers/index.js';
import { validateItem } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(itemController.getAllItems)
  .post(validateItem, itemController.createItem);

router
  .route('/:itemId')
  .get(itemController.getItemById)
  .put(validateItem, itemController.updateItem)
  .delete(itemController.deleteItem);

export default router;
