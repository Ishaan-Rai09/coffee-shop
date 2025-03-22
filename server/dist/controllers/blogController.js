"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogCategories = exports.deleteBlogPost = exports.updateBlogPost = exports.createBlogPost = exports.getBlogPostBySlug = exports.getBlogPosts = void 0;
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
// @desc    Fetch all blog posts with filters for category and pagination
// @route   GET /api/blog
// @access  Public
const getBlogPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = 6;
        const page = Number(req.query.pageNumber) || 1;
        const category = req.query.category ? { category: req.query.category } : {};
        const keyword = req.query.keyword
            ? {
                $or: [
                    { title: { $regex: req.query.keyword, $options: 'i' } },
                    { excerpt: { $regex: req.query.keyword, $options: 'i' } },
                    { tags: { $in: [new RegExp(req.query.keyword, 'i')] } },
                ],
            }
            : {};
        // Combine filters
        const filter = Object.assign(Object.assign(Object.assign({}, category), keyword), { published: true });
        const count = yield BlogPost_1.default.countDocuments(filter);
        const posts = yield BlogPost_1.default.find(filter)
            .sort({ date: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        res.json({
            posts,
            page,
            pages: Math.ceil(count / pageSize),
            total: count,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getBlogPosts = getBlogPosts;
// @desc    Fetch single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
const getBlogPostBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield BlogPost_1.default.findOne({ slug: req.params.slug });
        if (post) {
            res.json(post);
        }
        else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getBlogPostBySlug = getBlogPostBySlug;
// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private/Admin
const createBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, excerpt, content, authorRole, authorImage, image, category, tags, readTime, published, } = req.body;
        // Create a slug from the title
        const slug = title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
        // Check if a post with this slug already exists
        const slugExists = yield BlogPost_1.default.findOne({ slug });
        if (slugExists) {
            return res.status(400).json({ message: 'A post with this title already exists' });
        }
        const user = req.user;
        const post = new BlogPost_1.default({
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
        const createdPost = yield post.save();
        res.status(201).json(createdPost);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createBlogPost = createBlogPost;
// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
const updateBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, excerpt, content, authorRole, authorImage, image, category, tags, readTime, published, } = req.body;
        const post = yield BlogPost_1.default.findById(req.params.id);
        if (post) {
            // If title has changed, update the slug
            if (title && title !== post.title) {
                const newSlug = title
                    .toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');
                // Check if a post with this slug already exists (except current post)
                const slugExists = yield BlogPost_1.default.findOne({
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
            const updatedPost = yield post.save();
            res.json(updatedPost);
        }
        else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.updateBlogPost = updateBlogPost;
// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteBlogPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield BlogPost_1.default.findById(req.params.id);
        if (post) {
            yield post.deleteOne();
            res.json({ message: 'Blog post removed' });
        }
        else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.deleteBlogPost = deleteBlogPost;
// @desc    Get blog categories with post counts
// @route   GET /api/blog/categories
// @access  Public
const getBlogCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield BlogPost_1.default.aggregate([
            { $match: { published: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(categories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getBlogCategories = getBlogCategories;
