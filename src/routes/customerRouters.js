import { Router } from 'express';

import { customerController } from '../controllers/index.js';
import { validateCustomer } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(customerController.getAllCustomers)
  .post(validateCustomer, customerController.createCustomer);

router
  .route('/:customerId')
  .get(customerController.getCustomerById)
  .put(validateCustomer, customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

export default router;
