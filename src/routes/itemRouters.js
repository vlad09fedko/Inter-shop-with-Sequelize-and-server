import { Router } from 'express';

import itemController from '../controllers/itemController.js';
import { validateItem } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(itemController.getItems)
  .post(validateItem, itemController.createItem)
  .put(validateItem, itemController.updateItem);

router
  .route('/:itemId')
  .get(itemController.getItemById)
  .delete(itemController.deleteItem);

export default router;
