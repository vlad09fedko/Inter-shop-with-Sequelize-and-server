import { Router } from 'express';

import { storeController } from '../controllers/index.js';
import { validateStore } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(storeController.getAllStores)
  .post(validateStore, storeController.createStore);

router
  .route('/:storeId')
  .get(storeController.getStoreById)
  .put(validateStore, storeController.updateStore)
  .delete(storeController.deleteStore);

export default router;
