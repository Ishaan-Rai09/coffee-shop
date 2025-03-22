import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-coffee-light min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-coffee-dark" style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/hero/about-hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-coffee-secondary mb-0 text-lg max-w-2xl mx-auto">
            Crafting perfect moments, one cup at a time since 2010
          </p>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6 text-coffee-dark">Our Journey</h2>
              <p className="text-gray-700 mb-6">
                CaféDelights started in 2010 as a small corner shop with a simple but meaningful mission: to create a beloved destination for coffee enthusiasts. Our passion for quality coffee and exceptional service has remained unchanged throughout our journey.
              </p>
              <p className="text-gray-700">
                What began as a neighborhood coffee shop has grown into a thriving community hub, but we've never lost sight of our roots. We continue to source the finest beans ethically and maintain sustainable practices throughout our operations.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/brewing-coffee.jpg"
                alt="Barista brewing coffee"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-coffee-primary mb-2">15+</p>
              <p className="text-gray-700">Years of Experience</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-coffee-primary mb-2">5</p>
              <p className="text-gray-700">Locations</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-coffee-primary mb-2">20+</p>
              <p className="text-gray-700">Coffee Varieties</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-coffee-primary mb-2">10K+</p>
              <p className="text-gray-700">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-coffee-dark">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-coffee-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-coffee-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-coffee-dark">Sustainability</h3>
              <p className="text-gray-700">
                We source our beans ethically and maintain sustainable practices throughout our operations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-coffee-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-coffee-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-coffee-dark">Community</h3>
              <p className="text-gray-700">
                Building relationships with our customers and supporting local communities.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-coffee-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-coffee-dark" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-coffee-dark">Quality</h3>
              <p className="text-gray-700">
                Committed to serving the finest coffee and providing exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-coffee-dark">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <img
                src="/images/team/team-1.jpg"
                alt="James Wilson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-coffee-dark">James Wilson</h3>
              <p className="text-gray-600">Master Roaster</p>
            </div>
            <div className="text-center">
              <img
                src="/images/team/team-2.jpg"
                alt="Sarah Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-coffee-dark">Sarah Chen</h3>
              <p className="text-gray-600">Head Barista</p>
            </div>
            <div className="text-center">
              <img
                src="/images/team/team-3.jpg"
                alt="Michael Brown"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-coffee-dark">Michael Brown</h3>
              <p className="text-gray-600">Café Manager</p>
            </div>
            <div className="text-center">
              <img
                src="/images/team/team-4.jpg"
                alt="Emma Davis"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-coffee-dark">Emma Davis</h3>
              <p className="text-gray-600">Quality Control</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 