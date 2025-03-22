import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogPostBySlug, getBlogPosts } from '../services/api';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  readTime: number;
}

// Add fallback images constant
const FALLBACK_IMAGE = '/images/placeholder.jpg';
const FALLBACK_AUTHOR_IMAGE = '/images/avatar-placeholder.jpg';

// Mock data for when API fails
const MOCK_BLOG_POST: BlogPost = {
  _id: '1',
  title: 'The Art of Coffee Brewing',
  slug: 'art-of-coffee-brewing',
  content: `
    <h2>Introduction to Coffee Brewing</h2>
    <p>Coffee brewing is both an art and a science. The perfect cup of coffee depends on several factors, including the quality of the beans, the grind size, water temperature, and brewing method.</p>
    
    <p>In this comprehensive guide, we'll explore different brewing techniques and how each affects the flavor profile of your coffee.</p>
    
    <h2>Choosing the Right Beans</h2>
    <p>The foundation of a great cup of coffee starts with high-quality beans. Look for beans that have been roasted within the last two weeks for optimal freshness. The roast level - light, medium, or dark - will significantly impact the flavor.</p>
    
    <p>Light roasts preserve more of the bean's original flavor characteristics and offer higher acidity. Medium roasts balance acidity with body, while dark roasts feature bolder, deeper flavors with less acidity.</p>
    
    <h2>Grinding Matters</h2>
    <p>The grind size directly affects extraction rate. Too fine a grind can lead to over-extraction and bitterness, while too coarse a grind results in under-extraction and weak coffee.</p>
    
    <p>Different brewing methods require different grind sizes:</p>
    <ul>
      <li>French Press: Coarse grind</li>
      <li>Drip Coffee: Medium grind</li>
      <li>Pour-Over: Medium-fine grind</li>
      <li>Espresso: Fine grind</li>
    </ul>
    
    <h2>Water Temperature and Quality</h2>
    <p>The ideal water temperature for coffee extraction is between 195°F and 205°F (90-96°C). Water that's too hot can extract bitter compounds, while water that's too cool will result in under-extraction.</p>
    
    <p>Water quality is often overlooked but critically important. Use filtered water for the cleanest taste.</p>
    
    <h2>Brewing Methods Compared</h2>
    <p>Each brewing method has its unique characteristics:</p>
    
    <h3>Pour-Over</h3>
    <p>This method offers excellent clarity and highlights the nuanced flavors of single-origin coffees. The slow, controlled pour allows for precise extraction control.</p>
    
    <h3>French Press</h3>
    <p>The immersion brewing method creates a full-bodied cup with rich mouthfeel due to the oils and fine particles that pass through the mesh filter.</p>
    
    <h3>Espresso</h3>
    <p>Pressure brewing creates a concentrated coffee with crema on top. It's the foundation for many specialty coffee drinks.</p>
    
    <h3>AeroPress</h3>
    <p>A versatile brewing method that combines immersion and pressure for a clean cup with full flavor in a short brewing time.</p>
    
    <h2>Conclusion</h2>
    <p>Brewing the perfect cup of coffee is a rewarding journey of experimentation. By understanding these fundamental principles and practicing your technique, you'll be able to craft coffee that suits your personal taste preferences.</p>
  `,
  authorName: 'Jane Smith',
  authorRole: 'Coffee Expert',
  authorImage: '/images/avatar-placeholder.jpg',
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  image: '/images/placeholder.jpg',
  category: 'brewing',
  tags: ['coffee', 'brewing', 'tips'],
  readTime: 5
};

// Mock related posts data
const MOCK_RELATED_POSTS = [
  {
    _id: '2',
    title: 'Coffee Bean Origins: A World Tour',
    slug: 'coffee-bean-origins',
    excerpt: 'Take a journey around the world to discover how different regions produce unique coffee flavors.',
    authorName: 'Michael Johnson',
    authorImage: '/images/avatar-placeholder.jpg',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: '/images/placeholder.jpg',
    category: 'origins',
    readTime: 7
  },
  {
    _id: '3',
    title: 'Sustainable Coffee Farming Practices',
    slug: 'sustainable-coffee-farming',
    excerpt: 'Learn about how sustainable farming practices are shaping the future of coffee production.',
    authorName: 'Sophia Patel',
    authorImage: '/images/avatar-placeholder.jpg',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    image: '/images/placeholder.jpg',
    category: 'sustainability',
    readTime: 6
  }
];

const BlogPostPage: React.FC = () => {
  const { id: slug } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const postData = await getBlogPostBySlug(slug);
        setBlogPost({
          ...postData,
          date: new Date(postData.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        });
        
        // Fetch related posts by category
        if (postData.category) {
          try {
            const { posts } = await getBlogPosts('1', postData.category);
            // Filter out the current post
            const filteredPosts = posts
              .filter((post: any) => post.slug !== slug)
              .slice(0, 3)
              .map((post: any) => ({
                ...post,
                date: new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
              }));
            
            setRelatedPosts(filteredPosts);
          } catch (err) {
            console.error('Error fetching related posts:', err);
            setRelatedPosts(MOCK_RELATED_POSTS);
          }
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Showing sample data instead.');
        // Use mock data when API fails
        setBlogPost(MOCK_BLOG_POST);
        setRelatedPosts(MOCK_RELATED_POSTS);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPost();
    window.scrollTo(0, 0);
  }, [slug]);

  // Add helper function for image error handling
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleAuthorImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_AUTHOR_IMAGE;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-48">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coffee-primary"></div>
      </div>
    );
  }

  if (!blogPost && !error) {
    return (
      <div className="bg-coffee-light min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-coffee-dark mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/blog" 
            className="inline-block px-6 py-3 bg-coffee-primary text-white rounded-md hover:bg-coffee-dark transition duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-coffee-light min-h-screen py-16">
      <div className="container mx-auto px-4">
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

        {blogPost && (
          <>
            {/* Blog post header */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-10">
              <img 
                src={blogPost.image} 
                alt={blogPost.title} 
                className="w-full h-80 object-cover"
                onError={handleImageError}
              />
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-coffee-secondary text-coffee-dark text-sm font-medium px-3 py-1 rounded-full">
                    {blogPost.category.charAt(0).toUpperCase() + blogPost.category.slice(1)}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">{blogPost.date}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">{blogPost.readTime} min read</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-6">{blogPost.title}</h1>
                
                <div className="flex items-center mb-8 pb-8 border-b border-gray-200">
                  <img 
                    src={blogPost.authorImage} 
                    alt={blogPost.authorName} 
                    className="h-12 w-12 rounded-full mr-4"
                    onError={handleAuthorImageError}
                  />
                  <div>
                    <p className="font-medium text-coffee-dark">{blogPost.authorName}</p>
                    <p className="text-sm text-gray-600">{blogPost.authorRole}</p>
                  </div>
                </div>
                
                {/* Blog content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
                
                {/* Tags */}
                {blogPost.tags && blogPost.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-coffee-dark mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map(tag => (
                        <Link
                          key={tag}
                          to={`/blog?tag=${tag}`}
                          className="px-3 py-1 bg-gray-100 text-coffee-dark text-sm rounded-full hover:bg-coffee-secondary transition"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="max-w-4xl mx-auto mb-10">
                <h2 className="text-2xl font-bold text-coffee-dark mb-6">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map(post => (
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
                        <div className="text-xs font-medium text-coffee-primary mb-1">
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </div>
                        <Link to={`/blog/${post.slug}`} className="block">
                          <h3 className="text-lg font-semibold text-coffee-dark mb-2 hover:text-coffee-primary">
                            {post.title}
                          </h3>
                        </Link>
                        {post.excerpt && (
                          <p className="text-gray-600 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                        )}
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
              </div>
            )}
            
            {/* Back to blog */}
            <div className="max-w-4xl mx-auto text-center">
              <Link 
                to="/blog" 
                className="inline-block px-6 py-3 bg-coffee-primary text-white rounded-md hover:bg-coffee-dark transition duration-300"
              >
                Back to Blog
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage; 