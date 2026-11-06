import { Router } from 'express';

import brandRouters from './brandRouters.js';
import customerRouters from './customerRouters.js';
import itemCategoryRouters from './itemCategoryRouters.js';
import itemModelRouters from './itemModelRouters.js';
import itemRouters from './itemRouters.js';
import itemTypeRouters from './itemTypeRouters.js';
import orderRouters from './orderRouters.js';
import storeRouters from './storeRouters.js';

const router = new Router();

router.use('/brands', brandRouters);
router.use('/customers', customerRouters);
router.use('/itemCategories', itemCategoryRouters);
router.use('/itemModels', itemModelRouters);
router.use('/items', itemRouters);
router.use('/itemTypes', itemTypeRouters);
router.use('/orders', orderRouters);
router.use('/stores', storeRouters);

export default router;
