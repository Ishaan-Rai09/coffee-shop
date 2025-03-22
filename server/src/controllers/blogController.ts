import { Request, Response } from 'express';
import BlogPost, { IBlogPost } from '../models/BlogPost';
import { IUser } from '../models/User';

// @desc    Fetch all blog posts with filters for category and pagination
// @route   GET /api/blog
// @access  Public
export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const category = req.query.category ? { category: req.query.category } : {};
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { excerpt: { $regex: req.query.keyword, $options: 'i' } },
            { tags: { $in: [new RegExp(req.query.keyword as string, 'i')] } },
          ],
        }
      : {};

    // Combine filters
    const filter = {
      ...category,
      ...keyword,
      published: true,
    };

    const count = await BlogPost.countDocuments(filter);
    const posts = await BlogPost.find(filter)
      .sort({ date: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      posts,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
export const getBlogPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private/Admin
export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const {
      title,
      excerpt,
      content,
      authorRole,
      authorImage,
      image,
      category,
      tags,
      readTime,
      published,
    } = req.body;

    // Create a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    // Check if a post with this slug already exists
    const slugExists = await BlogPost.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({ message: 'A post with this title already exists' });
    }

    const user = req.user as IUser;

    const post = new BlogPost({
      title,
      slug,
      excerpt,
      content,
      author: user._id,
      authorName: user.name,
      authorRole: authorRole || 'Writer',
      authorImage: authorImage || '/images/blog/authors/default.jpg',
      image,
      category,
      tags: tags || [],
      readTime: readTime || 5,
      published: published !== undefined ? published : true,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const {
      title,
      excerpt,
      content,
      authorRole,
      authorImage,
      image,
      category,
      tags,
      readTime,
      published,
    } = req.body;

    const post = await BlogPost.findById(req.params.id);

    if (post) {
      // If title has changed, update the slug
      if (title && title !== post.title) {
        const newSlug = title
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-');
        
        // Check if a post with this slug already exists (except current post)
        const slugExists = await BlogPost.findOne({ 
          slug: newSlug, 
          _id: { $ne: post._id } 
        });
        
        if (slugExists) {
          return res.status(400).json({ message: 'A post with this title already exists' });
        }
        
        post.slug = newSlug;
      }

      post.title = title || post.title;
      post.excerpt = excerpt || post.excerpt;
      post.content = content || post.content;
      post.authorRole = authorRole || post.authorRole;
      post.authorImage = authorImage || post.authorImage;
      post.image = image || post.image;
      post.category = category || post.category;
      post.tags = tags || post.tags;
      post.readTime = readTime || post.readTime;
      post.published = published !== undefined ? published : post.published;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (post) {
      await post.deleteOne();
      res.json({ message: 'Blog post removed' });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get blog categories with post counts
// @route   GET /api/blog/categories
// @access  Public
export const getBlogCategories = async (req: Request, res: Response) => {
  try {
    const categories = await BlogPost.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}; 