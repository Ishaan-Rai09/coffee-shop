import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './pages/NotFoundPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SitemapPage from './pages/SitemapPage';
import PrivateRoute from './components/routing/PrivateRoute';
import { useDispatch } from 'react-redux';
import { checkAuth } from './services/api';
import { setUser, clearUser } from './state/userSlice';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        // Check for userInfo in localStorage
        const userInfoString = localStorage.getItem('userInfo');
        
        if (userInfoString) {
          // If userInfo exists, parse it and set user in Redux
          const userInfo = JSON.parse(userInfoString);
          
          if (userInfo && userInfo.token) {
            // Use API to verify token is still valid
            try {
              await checkAuth();
              dispatch(setUser(userInfo));
            } catch (authError) {
              console.error('Token validation failed:', authError);
              localStorage.removeItem('userInfo');
              dispatch(clearUser());
            }
          } else {
            // If userInfo doesn't have token, clear it
            localStorage.removeItem('userInfo');
            dispatch(clearUser());
          }
        } else {
          // No userInfo in localStorage
          dispatch(clearUser());
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch(clearUser());
        localStorage.removeItem('userInfo');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p>Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <ErrorBoundary>
            <Suspense fallback={<div className="py-48 text-center"><div className="spinner mb-4 mx-auto"></div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Navigate to="/menu" replace />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } />
                <Route path="/orders" element={
                  <PrivateRoute>
                    <OrdersPage />
                  </PrivateRoute>
                } />
                <Route path="/order/:id" element={
                  <PrivateRoute>
                    <OrderPage />
                  </PrivateRoute>
                } />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
