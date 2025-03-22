import React from 'react';
import { Link } from 'react-router-dom';

type SitemapLink = {
  name: string;
  path: string;
  description?: string;
  children?: SitemapLink[];
};

const sitemapData: SitemapLink[] = [
  {
    name: 'Home',
    path: '/',
    description: 'The main landing page for CaféDelights',
  },
  {
    name: 'Menu',
    path: '/menu',
    description: 'Browse our coffee, beverages, pastries, and more',
  },
  {
    name: 'Products',
    path: '/products',
    description: 'Shop for coffee beans, brewing equipment, and accessories',
  },
  {
    name: 'About Us',
    path: '/about',
    description: 'Learn about our story, mission, and values',
  },
  {
    name: 'Blog',
    path: '/blog',
    description: 'Explore our articles about coffee culture and brewing tips',
  },
  {
    name: 'Contact',
    path: '/contact',
    description: 'Get in touch with us for inquiries or feedback',
  },
  {
    name: 'Shop',
    path: '/products',
    description: 'Browse and purchase our coffee products',
  },
  {
    name: 'User Account',
    path: '/login',
    description: 'Manage your account and orders',
    children: [
      {
        name: 'Login',
        path: '/login',
        description: 'Sign in to your account',
      },
      {
        name: 'Register',
        path: '/register',
        description: 'Create a new account',
      },
      {
        name: 'Profile',
        path: '/profile',
        description: 'View and edit your profile information',
      },
      {
        name: 'Orders',
        path: '/orders',
        description: 'View your order history',
      },
    ],
  },
  {
    name: 'Shopping',
    path: '/cart',
    description: 'Manage your shopping cart and checkout',
    children: [
      {
        name: 'Cart',
        path: '/cart',
        description: 'View and edit items in your cart',
      },
      {
        name: 'Checkout',
        path: '/checkout',
        description: 'Complete your purchase',
      },
    ],
  },
  {
    name: 'Legal',
    path: '/privacy',
    description: 'Legal information and policies',
    children: [
      {
        name: 'Privacy Policy',
        path: '/privacy',
        description: 'Learn how we collect and use your data',
      },
      {
        name: 'Terms of Service',
        path: '/terms',
        description: 'Understand the terms of using our services',
      },
    ],
  },
];

const SitemapPage: React.FC = () => {
  return (
    <div className="bg-coffee-light py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-8">Sitemap</h1>
          
          <p className="text-gray-600 mb-8">
            Welcome to our sitemap. This page provides an overview of all the sections and pages available on our website.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {sitemapData.map((section) => (
              <div key={section.path} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold text-coffee-dark mb-2">
                  <Link to={section.path} className="hover:text-coffee-primary transition-colors">
                    {section.name}
                  </Link>
                </h2>
                {section.description && (
                  <p className="text-gray-600 text-sm mb-3">{section.description}</p>
                )}
                
                {section.children && section.children.length > 0 && (
                  <ul className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                    {section.children.map((child) => (
                      <li key={child.path} className="text-gray-700">
                        <Link 
                          to={child.path} 
                          className="flex justify-between items-center hover:text-coffee-primary transition-colors"
                        >
                          <span>{child.name}</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        {child.description && (
                          <p className="text-gray-500 text-xs mt-1">{child.description}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link to="/" className="text-coffee-primary hover:text-coffee-dark transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage; 