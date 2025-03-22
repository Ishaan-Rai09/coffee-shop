import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-coffee-light py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              At CaféDelights, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us. For example, we collect information when you create an account, make a purchase, sign up for our newsletter, or communicate with us.
            </p>
            <p className="text-gray-700 mb-4">
              The types of information we may collect include your:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Name</li>
              <li>Email address</li>
              <li>Mailing address</li>
              <li>Phone number</li>
              <li>Payment information</li>
              <li>Order history</li>
              <li>Account preferences</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We may use the information we collect from you for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Process and fulfill your orders</li>
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, offers, promotions, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve your experience</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">5. Third-Party Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described in this Privacy Policy. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">6. Security of Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">7. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">8. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong> privacy@cafedelights.com<br />
              <strong>Phone:</strong> (555) 123-4567<br />
              <strong>Address:</strong> 123 Coffee Street, Beanville, NY 12345
            </p>
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

export default PrivacyPolicyPage; 