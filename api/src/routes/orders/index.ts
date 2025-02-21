import { Router } from 'express';
import { createOrder, getOrder, listOrders, updateOrder } from './ordersController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { insertOrderWithItemsSchema, updateOrderScehma } from '../../db/ordersSchema.js';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, validateData(insertOrderWithItemsSchema), createOrder);

router.get('/', verifyToken, listOrders);
router.get('/:id', verifyToken, getOrder);
router.put('/:id', verifyToken, validateData(updateOrderScehma), updateOrder)
export default router;
