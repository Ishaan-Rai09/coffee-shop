import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, getBlogCategories } from '../services/api';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  readTime: number;
}

interface Category {
  _id: string;
  count: number;
}

// Add fallback images constant
const FALLBACK_IMAGE = '/images/blog/posts/coffee-brewing.jpg';
const FALLBACK_AUTHOR_IMAGE = '/images/team/team-1.jpg';

// Mock data for when API fails
const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    _id: '1',
    title: 'The Art of Coffee Brewing',
    slug: 'art-of-coffee-brewing',
    excerpt: 'Discover the secrets to brewing the perfect cup of coffee with these expert tips and techniques.',
    authorName: 'Jane Smith',
    authorRole: 'Coffee Expert',
    authorImage: '/images/team/team-2.jpg',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: '/images/blog/posts/coffee-brewing.jpg',
    category: 'brewing',
    tags: ['coffee', 'brewing', 'tips'],
    readTime: 5
  },
  {
    _id: '2',
    title: 'Coffee Bean Origins: A World Tour',
    slug: 'coffee-bean-origins',
    excerpt: 'Take a journey around the world to discover how different regions produce unique coffee flavors.',
    authorName: 'Michael Johnson',
    authorRole: 'Coffee Roaster',
    authorImage: '/images/team/team-3.jpg',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: '/images/blog/posts/coffee-beans.jpg',
    category: 'origins',
    tags: ['coffee', 'origins', 'beans'],
    readTime: 7
  },
  {
    _id: '3',
    title: 'Sustainable Coffee Farming Practices',
    slug: 'sustainable-coffee-farming',
    excerpt: 'Learn about how sustainable farming practices are shaping the future of coffee production.',
    authorName: 'Sophia Patel',
    authorRole: 'Sustainability Expert',
    authorImage: '/images/team/team-4.jpg',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: '/images/blog/posts/sustainable-coffee.jpg',
    category: 'sustainability',
    tags: ['coffee', 'sustainability', 'farming'],
    readTime: 6
  }
];

// Mock categories
const MOCK_CATEGORIES: Category[] = [
  { _id: 'brewing', count: 5 },
  { _id: 'origins', count: 3 },
  { _id: 'sustainability', count: 2 }
];

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const category = activeCategory === 'all' ? '' : activeCategory;
        const { posts, pages, total } = await getBlogPosts(page.toString(), category);
        
        // Format date strings
        const formattedPosts = posts.map((post: any) => ({
          ...post,
          date: new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        
        setBlogPosts(formattedPosts);
        setTotalPages(pages);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Showing sample data instead.');
        // Use mock data when API fails
        setBlogPosts(MOCK_BLOG_POSTS);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        const categoriesData = await getBlogCategories();
        console.log('Categories data:', categoriesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Use mock categories when API fails
        setCategories(MOCK_CATEGORIES);
      }
    };

    fetchBlogPosts();
    fetchCategories();
  }, [activeCategory, page]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPage(1); // Reset to page 1 when changing category
  };

  // Create category buttons including 'all'
  const categoryButtons = [
    { id: 'all', name: 'All Posts' },
    ...categories.map(cat => ({
      id: cat._id,
      name: cat._id.charAt(0).toUpperCase() + cat._id.slice(1),
    })),
  ];

  // Featured post is the first post in the array
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
  
  // Recent posts exclude the featured post
  const recentPosts = featuredPost 
    ? blogPosts.filter(post => post._id !== featuredPost._id) 
    : [];

  // Add helper function for image error handling
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleAuthorImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_AUTHOR_IMAGE;
  };

  return (
    <div className="bg-coffee-light min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-coffee-dark">Coffee Blog</h1>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Brewing knowledge, one post at a time. Explore our collection of articles about coffee,
          from brewing techniques to coffee culture and sustainability.
        </p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coffee-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && activeCategory === 'all' && (
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-6 text-coffee-dark">Featured Post</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="h-64 w-full object-cover md:h-full"
                        onError={handleImageError}
                      />
                    </div>
                    <div className="p-6 md:w-1/2 md:flex md:flex-col md:justify-between">
                      <div>
                        <div className="text-sm font-medium text-coffee-primary mb-1">
                          {featuredPost.category.charAt(0).toUpperCase() + featuredPost.category.slice(1)}
                        </div>
                        <Link to={`/blog/${featuredPost.slug}`} className="block">
                          <h3 className="text-2xl font-bold text-coffee-dark mb-2 hover:text-coffee-primary">
                            {featuredPost.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                      </div>
                      <div className="flex items-center">
                        <img 
                          src={featuredPost.authorImage} 
                          alt={featuredPost.authorName} 
                          className="h-10 w-10 rounded-full mr-3"
                          onError={handleAuthorImageError}
                        />
                        <div>
                          <p className="text-sm font-medium text-coffee-dark">{featuredPost.authorName}</p>
                          <div className="flex text-sm text-gray-500">
                            <span>{featuredPost.date}</span>
                            <span className="mx-1">•</span>
                            <span>{featuredPost.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categoryButtons.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-coffee-primary text-white'
                      : 'bg-white text-coffee-dark hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Display error message if any */}
            {error && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Blog posts grid */}
            {blogPosts.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                No blog posts found for this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                  <div 
                    key={post._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="h-48 w-full object-cover"
                        onError={handleImageError}
                      />
                    </Link>
                    <div className="p-5">
                      <div className="text-sm font-medium text-coffee-primary mb-1">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </div>
                      <Link to={`/blog/${post.slug}`} className="block">
                        <h3 className="text-xl font-semibold text-coffee-dark mb-2 hover:text-coffee-primary">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center">
                        <img 
                          src={post.authorImage} 
                          alt={post.authorName} 
                          className="h-8 w-8 rounded-full mr-2"
                          onError={handleAuthorImageError}
                        />
                        <div>
                          <p className="text-xs font-medium text-coffee-dark">{post.authorName}</p>
                          <div className="flex text-xs text-gray-500">
                            <span>{post.date}</span>
                            <span className="mx-1">•</span>
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="inline-flex shadow-sm rounded-md">
                  <button
                    onClick={() => setPage(page => Math.max(page - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm font-medium text-coffee-primary bg-white border border-gray-300 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-4 py-2 text-sm font-medium ${
                        page === i + 1
                          ? 'text-white bg-coffee-primary'
                          : 'text-coffee-primary bg-white'
                      } border border-gray-300`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(page => Math.min(page + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm font-medium text-coffee-primary bg-white border border-gray-300 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}

        {/* Newsletter signup */}
        <div className="mt-16 bg-coffee-dark text-white p-8 rounded-lg shadow-md">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h2>
              <p className="mb-6 md:mb-0">
                Get the latest articles, brewing tips, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="md:w-1/3">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-md focus:outline-none text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-coffee-primary hover:bg-coffee-secondary text-white font-medium py-2 px-4 rounded-md transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 