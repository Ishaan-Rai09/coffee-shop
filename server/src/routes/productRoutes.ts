import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { admin, protect } from '../middleware/authMiddleware';

const router = express.Router();

// @route   GET /api/products
router.route('/').get(getProducts);

// @route   GET /api/products/:id
router.route('/:id').get(getProductById);

// Admin routes
// @route   POST /api/products
router.route('/').post(protect, admin, createProduct);

// @route   PUT /api/products/:id
router.route('/:id').put(protect, admin, updateProduct);

// @route   DELETE /api/products/:id
router.route('/:id').delete(protect, admin, deleteProduct);

export default router; 