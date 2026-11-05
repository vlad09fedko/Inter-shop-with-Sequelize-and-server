import { Router } from 'express';

import orderController from '../controllers/orderController.js';
import { validateOrder } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(orderController.getOrders)
  .post(validateOrder, orderController.createOrder)
  .put(validateOrder, orderController.updateOrder);

router
  .route('/:orderId')
  .get(orderController.getOrderById)
  .delete(orderController.deleteOrder);

export default router;
