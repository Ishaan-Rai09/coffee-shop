import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactPage: React.FC = () => {
  const [formState, handleFormSubmit] = useForm("xjkywglw"); // Replace with your Formspree form ID
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    handleFormSubmit(e);
  };

  return (
    <div className="bg-coffee-light min-h-screen">
      {/* Hero Section */}
      <div className="bg-coffee-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our coffee,
          services, or anything else, our team is ready to answer all your questions.
        </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="bg-coffee-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-coffee-dark" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Visit Us</h3>
            <p className="text-gray-700">123 Coffee Street</p>
            <p className="text-gray-700">Beanville, NY 12345</p>
            <p className="text-gray-700 mt-2">Mon-Fri: 7am - 7pm</p>
            <p className="text-gray-700">Sat-Sun: 8am - 6pm</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="bg-coffee-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-coffee-dark" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Call Us</h3>
            <p className="text-gray-700">(555) 123-4567</p>
            <p className="text-gray-700">Main Office</p>
            <p className="text-gray-700 mt-2">(555) 987-6543</p>
            <p className="text-gray-700">Catering & Events</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="bg-coffee-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-coffee-dark" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Email Us</h3>
            <p className="text-gray-700">hello@cafedelights.com</p>
            <p className="text-gray-700 mb-2">Customer Support</p>
            <p className="text-gray-700">orders@cafedelights.com</p>
            <p className="text-gray-700">Online Orders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {formState.succeeded ? (
            <div className="p-8 text-center">
                <div className="bg-green-100 text-green-700 p-6 rounded-md mb-6 flex flex-col items-center">
                  <svg className="h-16 w-16 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p>Your message has been sent successfully! We'll get back to you soon.</p>
              </div>
              <button
                  onClick={() => window.location.reload()}
                  className="bg-coffee-primary hover:bg-coffee-dark text-white py-2 px-6 rounded-md transition duration-300"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8">
                <h2 className="text-2xl font-bold text-coffee-dark mb-6">Send Us a Message</h2>
              {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                    <p>{error}</p>
                </div>
              )}
                {/* Hidden field for combined form data */}
                <input
                  type="hidden"
                  name="formData"
                  value={JSON.stringify(formData)}
                />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-primary focus:border-transparent"
                  required
                />
                    <ValidationError prefix="Email" field="email" errors={formState.errors} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-primary focus:border-transparent"
                    />
                  </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-primary focus:border-transparent"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Catering">Catering</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Job Application">Job Application</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-coffee-primary focus:border-transparent resize-none"
                  required
                ></textarea>
                  <ValidationError prefix="Message" field="message" errors={formState.errors} />
              </div>
              <button
                type="submit"
                  disabled={formState.submitting}
                  className="bg-coffee-primary hover:bg-coffee-dark text-white py-3 px-8 rounded-md font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState.submitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    'Send Message'
                  )}
              </button>
                <p className="text-gray-500 text-xs mt-4 text-center">
                  This form is protected by Formspree to ensure your messages are securely delivered.
                </p>
            </form>
          )}
        </div>

          {/* Map (embedded Google Maps) */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className="p-6 bg-coffee-primary text-white">
              <h2 className="text-2xl font-bold mb-2">Our Location</h2>
              <p>Stop by for a delicious cup of coffee at our flagship location.</p>
            </div>
            <div className="flex-grow relative">
              <div className="h-full w-full bg-gray-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.8906144020193!2d-74.0066351!3d40.7128875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Manhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1647294573267!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Café Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-coffee-dark mb-8 text-center">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-coffee-dark mb-2">Do you offer catering services?</h3>
                <p className="text-gray-700">Yes, we offer full-service catering for events of all sizes. From corporate meetings to weddings, we can provide custom coffee bars, pastries, and more. Contact us for details and pricing.</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-coffee-dark mb-2">What are your opening hours?</h3>
                <p className="text-gray-700">Our main location is open Monday to Friday from 7am to 7pm, and weekends from 8am to 6pm. Hours may vary for holidays and special events.</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-coffee-dark mb-2">Do you offer gift cards?</h3>
                <p className="text-gray-700">Yes! Gift cards are available for purchase in-store or online. They make perfect gifts for coffee lovers and can be loaded with any amount.</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-coffee-dark mb-2">Are you hiring?</h3>
                <p className="text-gray-700">We're always looking for passionate coffee enthusiasts to join our team. Check our Careers page for current openings or send your resume to careers@cafedelights.com.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-coffee-dark mb-6">Connect With Us</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Follow us on social media for the latest updates, promotions, and behind-the-scenes content.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="bg-coffee-primary hover:bg-coffee-dark text-white w-12 h-12 rounded-full flex items-center justify-center transition duration-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="bg-coffee-primary hover:bg-coffee-dark text-white w-12 h-12 rounded-full flex items-center justify-center transition duration-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
              </svg>
            </a>
            <a href="#" className="bg-coffee-primary hover:bg-coffee-dark text-white w-12 h-12 rounded-full flex items-center justify-center transition duration-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="bg-coffee-primary hover:bg-coffee-dark text-white w-12 h-12 rounded-full flex items-center justify-center transition duration-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
          <p className="text-gray-600">
            Email us at <a href="mailto:newsletter@cafedelights.com" className="text-coffee-primary hover:underline">newsletter@cafedelights.com</a> to subscribe to our monthly newsletter
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 