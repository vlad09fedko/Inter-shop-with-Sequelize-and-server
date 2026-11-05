import { Router } from 'express';

import brandController from '../controllers/brandController.js';
import { validateBrand } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(brandController.getBrands)
  .post(validateBrand, brandController.createBrand)
  .put(validateBrand, brandController.updateBrand);

router
  .route('/:brandId')
  .get(brandController.getBrandById)
  .delete(brandController.deleteBrand);

export default router;
