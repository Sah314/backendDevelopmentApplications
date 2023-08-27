import express from 'express';
import authRoutes from './auth';
import todosRoutes from './todos';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/todos', todosRoutes);

export default router;
