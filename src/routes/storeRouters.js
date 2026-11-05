import { Router } from 'express';

import storeController from '../controllers/storeController.js';
import { validateStore } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(storeController.getStores)
  .post(validateStore, storeController.createStore)
  .put(validateStore, storeController.updateStore);

router
  .route('/:storeId')
  .get(storeController.getStoreById)
  .delete(storeController.deleteStore);

export default router;
