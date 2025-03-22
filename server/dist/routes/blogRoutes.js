"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Public routes
router.route('/').get(blogController_1.getBlogPosts);
router.route('/categories').get(blogController_1.getBlogCategories);
router.route('/:slug').get(blogController_1.getBlogPostBySlug);
// Admin routes (protected)
router.route('/')
    .post(authMiddleware_1.protect, authMiddleware_1.admin, (req, res) => (0, blogController_1.createBlogPost)(req, res));
router.route('/:id')
    .put(authMiddleware_1.protect, authMiddleware_1.admin, (req, res) => (0, blogController_1.updateBlogPost)(req, res))
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, (req, res) => (0, blogController_1.deleteBlogPost)(req, res));
exports.default = router;
