import express from 'express';
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
} from '../controllers/orderController';
import { admin, protect } from '../middleware/authMiddleware';

const router = express.Router();

// @route   POST /api/orders
router.route('/').post(protect, createOrder);

// @route   GET /api/orders/myorders
router.route('/myorders').get(protect, getMyOrders);

// @route   GET /api/orders/:id
router.route('/:id').get(protect, getOrderById);

// @route   PUT /api/orders/:id/pay
router.route('/:id/pay').put(protect, updateOrderToPaid);

// @route   PUT /api/orders/:id/deliver
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router; 