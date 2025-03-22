import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add authorization headers when needed
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Product API calls
export const getProducts = async (pageNumber = '', category = '') => {
  try {
    const params = new URLSearchParams();
    if (pageNumber) params.append('pageNumber', pageNumber);
    if (category) params.append('category', category);
    
    const { data } = await api.get(`/products?${params.toString()}`);
    return data;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    // Return mock data when API fails
    return {
      products: [
        {
          _id: '1',
          name: 'Espresso',
          description: 'Rich, aromatic espresso with a thick golden crema layer.',
          price: 3.99,
          image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Espresso',
          countInStock: 10,
        },
        {
          _id: '2',
          name: 'Cappuccino',
          description: 'Perfect balance of espresso, steamed milk and foam.',
          price: 4.99,
          image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Cappuccino',
          countInStock: 15,
        },
        {
          _id: '3',
          name: 'Caramel Macchiato',
          description: 'Sweet and creamy with vanilla syrup and caramel drizzle.',
          price: 5.49,
          image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Macchiato',
          countInStock: 8,
        }
      ],
      page: 1,
      pages: 1
    };
  }
};

export const getProductById = async (id: string) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error: any) {
    throw error;
  }
};

// User API calls
export const login = async (email: string, password: string) => {
  try {
    const { data } = await api.post('/users/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const { data } = await api.post('/users', { name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('userInfo');
};

export const checkAuth = async () => {
  try {
    const { data } = await api.get('/users/check-auth');
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await api.get('/users/profile');
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updateUserProfile = async (userData: any) => {
  try {
    const { data } = await api.put('/users/profile', userData);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error: any) {
    throw error;
  }
};

// Order API calls
export const createOrder = async (orderData: any) => {
  try {
    const { data } = await api.post('/orders', orderData);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getMyOrders = async () => {
  try {
    const { data } = await api.get('/orders/myorders');
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const payOrder = async (orderId: string, paymentResult: any) => {
  try {
    const { data } = await api.put(`/orders/${orderId}/pay`, paymentResult);
    return data;
  } catch (error: any) {
    throw error;
  }
};

// Blog API calls
export const getBlogPosts = async (pageNumber = '', category = '', keyword = '') => {
  try {
    const params = new URLSearchParams();
    if (pageNumber) params.append('pageNumber', pageNumber);
    if (category) params.append('category', category);
    if (keyword) params.append('keyword', keyword);
    
    console.log(`Fetching blog posts: ${API_URL}/blog?${params.toString()}`);
    const { data } = await api.get(`/blog?${params.toString()}`);
    return data;
  } catch (error: any) {
    console.error('Blog posts fetch error:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  try {
    console.log(`Fetching blog post by slug: ${API_URL}/blog/${slug}`);
    const { data } = await api.get(`/blog/${slug}`);
    return data;
  } catch (error: any) {
    console.error(`Blog post fetch error for slug ${slug}:`, error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

export const getBlogCategories = async () => {
  try {
    console.log(`Fetching blog categories: ${API_URL}/blog/categories`);
    const { data } = await api.get('/blog/categories');
    return data;
  } catch (error: any) {
    console.error('Blog categories fetch error:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw error;
  }
};

// Admin Blog API calls
export const createBlogPost = async (postData: any) => {
  try {
    const { data } = await api.post('/blog', postData);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const updateBlogPost = async (id: string, postData: any) => {
  try {
    const { data } = await api.put(`/blog/${id}`, postData);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteBlogPost = async (id: string) => {
  try {
    const { data } = await api.delete(`/blog/${id}`);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export default api; 