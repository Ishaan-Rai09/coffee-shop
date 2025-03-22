"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// @route   POST /api/orders
router.route('/').post(authMiddleware_1.protect, orderController_1.createOrder);
// @route   GET /api/orders/myorders
router.route('/myorders').get(authMiddleware_1.protect, orderController_1.getMyOrders);
// @route   GET /api/orders/:id
router.route('/:id').get(authMiddleware_1.protect, orderController_1.getOrderById);
// @route   PUT /api/orders/:id/pay
router.route('/:id/pay').put(authMiddleware_1.protect, orderController_1.updateOrderToPaid);
// @route   PUT /api/orders/:id/deliver
router.route('/:id/deliver').put(authMiddleware_1.protect, authMiddleware_1.admin, orderController_1.updateOrderToDelivered);
exports.default = router;
