import { Router } from 'express';

import customerController from '../controllers/customerController.js';
import { validateCustomer } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(customerController.getCustomers)
  .post(validateCustomer, customerController.createCustomer)
  .put(validateCustomer, customerController.updateCustomer);

router
  .route('/:customerId')
  .get(customerController.getCustomerById)
  .delete(customerController.deleteCustomer);

export default router;
