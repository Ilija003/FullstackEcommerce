import { Router } from 'express';
import { createPaymentIntent, getKeys } from './stripeController';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = Router();


// endpoints
router.get('/keys', getKeys);

router.post('/payment-intent', verifyToken, createPaymentIntent);

export default router;