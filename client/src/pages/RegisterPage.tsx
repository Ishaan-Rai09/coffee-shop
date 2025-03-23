import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { register } from '../services/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../state/userSlice';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Extract redirect path from URL or use '/' as default
  const redirect = location.search ? new URLSearchParams(location.search).get('redirect') || '/' : '/';

  useEffect(() => {
    // Check if user is already logged in
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate(redirect === '' ? '/' : redirect);
    }
  }, [navigate, redirect]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userData = await register(name, email, password);
      
      // Set user in Redux store
      dispatch(setUser(userData));
      
      // Force redirect to home page to fix 404 issue
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-coffee-light min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-coffee-dark mb-6">Sign Up</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-coffee-primary"
                />
              </div>
              
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
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-coffee-primary"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-coffee-primary"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-coffee-primary hover:bg-coffee-dark text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            
            <div className="mt-6 text-center text-gray-700">
              <p>
                Already have an account?{' '}
                <Link 
                  to={redirect ? `/login?redirect=${redirect}` : '/login'} 
                  className="text-coffee-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 