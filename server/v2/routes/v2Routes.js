import Router from 'express';

import authRoutes from './authRoutes';
import entryRoutes from './entryRoutes';

const router = Router();

router.use(authRoutes);
router.use(entryRoutes);

export default router;
