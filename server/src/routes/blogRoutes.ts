import express, { Request, Response } from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogCategories,
} from '../controllers/blogController';
import { admin, protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.route('/').get(getBlogPosts);
router.route('/categories').get(getBlogCategories);
router.route('/:slug').get(getBlogPostBySlug);

// Admin routes (protected)
router.route('/')
  .post(protect, admin, (req: Request, res: Response) => createBlogPost(req, res));

router.route('/:id')
  .put(protect, admin, (req: Request, res: Response) => updateBlogPost(req, res))
  .delete(protect, admin, (req: Request, res: Response) => deleteBlogPost(req, res));

export default router; 