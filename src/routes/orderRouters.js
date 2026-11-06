import { Router } from 'express';

import {orderController} from '../controllers/index.js';
import { validateOrder } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(validateOrder, orderController.createOrder)
  .put(validateOrder, orderController.updateOrder);

router
  .route('/:orderId')
  .get(orderController.getOrderById)
  .delete(orderController.deleteOrder);

export default router;
