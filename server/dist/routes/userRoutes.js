"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// @route   POST /api/users
router.post('/', userController_1.registerUser);
// @route   POST /api/users/login
router.post('/login', userController_1.authUser);
// @route   GET /api/users/profile
router.route('/profile')
    .get(authMiddleware_1.protect, userController_1.getUserProfile)
    .put(authMiddleware_1.protect, userController_1.updateUserProfile);
exports.default = router;
