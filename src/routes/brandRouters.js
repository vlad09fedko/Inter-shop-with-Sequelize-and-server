import { Router } from 'express';

import { brandController } from '../controllers/index.js';
import { validateBrand } from '../middleware/validate.mw.js';

const router = new Router();

router
  .route('/')
  .get(brandController.getAllBrands)
  .post(validateBrand, brandController.createBrand);

router
  .route('/:brandId')
  .get(brandController.getBrandById)
  .put(validateBrand, brandController.updateBrand)
  .delete(brandController.deleteBrand);

export default router;
