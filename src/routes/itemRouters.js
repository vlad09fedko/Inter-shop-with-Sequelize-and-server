import { Router } from 'express';

import {itemController} from '../controllers/index.js';
import { validateItem } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(itemController.getAllItems)
  .post(validateItem, itemController.createItem)
  .put(validateItem, itemController.updateItem);

router
  .route('/:itemId')
  .get(itemController.getItemById)
  .delete(itemController.deleteItem);

export default router;
