import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-coffee-light min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-coffee-primary p-8 flex flex-col justify-center items-center text-white">
              <h1 className="text-9xl font-bold mb-4">404</h1>
              <div className="w-16 h-1 bg-coffee-secondary mb-6"></div>
              <p className="text-xl text-center">Oops! Page not found</p>
            </div>
            
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-coffee-dark mb-4">We can't find that page</h2>
              <p className="text-gray-600 mb-6">
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
              </p>
              
              <p className="text-gray-600 mb-8">
                Here are some helpful links instead:
              </p>
              
              <div className="space-y-3">
                <Link to="/" className="block text-coffee-primary hover:text-coffee-dark transition-colors">
                  → Return to Homepage
                </Link>
                <Link to="/menu" className="block text-coffee-primary hover:text-coffee-dark transition-colors">
                  → Browse our Menu
                </Link>
                <Link to="/products" className="block text-coffee-primary hover:text-coffee-dark transition-colors">
                  → Shop our Products
                </Link>
                <Link to="/contact" className="block text-coffee-primary hover:text-coffee-dark transition-colors">
                  → Contact Us
                </Link>
                <Link to="/sitemap" className="block text-coffee-primary hover:text-coffee-dark transition-colors">
                  → View our Sitemap
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  to="/"
                  className="inline-block bg-coffee-secondary text-coffee-dark px-6 py-3 rounded-full font-medium hover:bg-yellow-500 transition-colors"
                >
                  Go back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 