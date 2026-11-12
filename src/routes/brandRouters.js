import { Router } from 'express';

import { brandController } from '../controllers/index.js';
import { validateBrand, uploadBrandLogo } from '../middleware/index.js';

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

router.route('/:brandId/logos')
  .patch(uploadBrandLogo.single('brandLogo'), brandController.updateLogo)

export default router;
