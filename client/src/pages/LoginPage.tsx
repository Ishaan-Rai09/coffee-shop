import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/userSlice';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Extract redirect path from URL or use '/' as default
  const redirect = location.search ? new URLSearchParams(location.search).get('redirect') || '/' : '/';

  useEffect(() => {
    // Check if user is already logged in
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userData = await login(email, password);
      dispatch(setUser(userData));
      navigate(redirect);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // Create a friendly message explaining the redirect
  const getRedirectMessage = () => {
    if (!redirect || redirect === '/') return null;
    
    const pageName = redirect.includes('product/')
      ? 'continue adding this product to your cart'
      : `continue to ${redirect.charAt(0).toUpperCase() + redirect.slice(1)}`;
    
    return `Sign in to ${pageName}`;
  };

  const redirectMessage = getRedirectMessage();

  return (
    <div className="bg-coffee-light min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-coffee-dark mb-6">Sign In</h1>
            
            {redirectMessage && (
              <div className="bg-blue-50 text-blue-800 p-4 rounded-md mb-6">
                {redirectMessage}
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-coffee-primary"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-coffee-primary"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-coffee-primary hover:bg-coffee-dark text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-6 text-center text-gray-700">
              <p>
                New customer?{' '}
                <Link 
                  to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'} 
                  className="text-coffee-primary hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>

            {/* Test Account Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Test Account:</h3>
              <p className="text-sm text-gray-600">Email: user@example.com</p>
              <p className="text-sm text-gray-600">Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 