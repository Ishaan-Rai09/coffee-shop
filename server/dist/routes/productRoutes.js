"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// @route   GET /api/products
router.route('/').get(productController_1.getProducts);
// @route   GET /api/products/:id
router.route('/:id').get(productController_1.getProductById);
// Admin routes
// @route   POST /api/products
router.route('/').post(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.createProduct);
// @route   PUT /api/products/:id
router.route('/:id').put(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.updateProduct);
// @route   DELETE /api/products/:id
router.route('/:id').delete(authMiddleware_1.protect, authMiddleware_1.admin, productController_1.deleteProduct);
exports.default = router;
