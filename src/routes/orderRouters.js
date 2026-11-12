import { Router } from 'express';

import { orderController } from '../controllers/index.js';
import { validateOrder } from '../middleware/index.js';

const router = new Router();

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(validateOrder, orderController.createOrder);

router
  .route('/:orderId')
  .get(orderController.getOrderById)
  .put(validateOrder, orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default router;
