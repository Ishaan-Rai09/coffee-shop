import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-coffee-light py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to CaféDelights. These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the website or use our services.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">2. Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily download one copy of the materials on CaféDelights's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose or for any public display;</li>
              <li>Attempt to reverse engineer any software contained on CaféDelights's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by CaféDelights at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">3. Online Purchases and Terms</h2>
            <p className="text-gray-700 mb-4">
              By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or country of residence, and you have given us your consent to allow any of your minor dependents to use this site.
            </p>
            <p className="text-gray-700 mb-4">
              You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
            </p>
            <p className="text-gray-700 mb-4">
              All purchases through our site are subject to our Shipping Policy and Return Policy.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">4. User Account</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on our Service.
            </p>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account and password, including but not limited to restricting access to your computer and/or account. You accept responsibility for all activities that occur under your account and/or password.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">5. Product Information</h2>
            <p className="text-gray-700 mb-4">
              We strive to display as accurately as possible the colors, images, and other details of our products. We cannot guarantee that your computer or mobile device's display of any color will be accurate.
            </p>
            <p className="text-gray-700 mb-4">
              We reserve the right, but are not obligated, to limit the sales of our products or services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis. All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">6. Modifications to the Service</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the Service.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">7. Third-Party Links</h2>
            <p className="text-gray-700 mb-4">
              Certain content, products, and services available via our Service may include materials from third parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy of such third-party materials or websites.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall CaféDelights, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            
            <h2 className="text-2xl font-semibold text-coffee-dark mt-8 mb-4">9. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              Questions about the Terms of Service should be sent to us at:
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong> terms@cafedelights.com<br />
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

export default TermsOfServicePage; 