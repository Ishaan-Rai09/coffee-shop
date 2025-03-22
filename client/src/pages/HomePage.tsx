import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../state/cartSlice';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../services/api';

const HomePage: React.FC = () => {
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroImageError, setHeroImageError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle add to cart
  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      description: product.description,
      quantity: 1,
      countInStock: product.countInStock || 10
    }));
    
    // Optionally show a toast notification
    alert(`${product.name} added to cart!`);
  };

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setPopularProducts(data.products?.slice(0, 3) || []); // Get first 3 products
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-coffee-dark to-coffee-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImageError ? "/images/hero/main-hero.jpg" : "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1856&auto=format&fit=crop"} 
            alt="Coffee background" 
            className="w-full h-full object-cover object-center"
            onError={() => setHeroImageError(true)}
            loading="eager"
          />
        </div>
        <div className="container mx-auto px-4 py-28 md:py-40 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Elevate Your <span className="text-coffee-secondary italic">Coffee</span> Experience
            </h1>
            <p className="text-gray-100 mb-10 text-xl max-w-lg">
              Artisanal coffee crafted with passion. Where every sip tells a story of quality and tradition.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/menu"
                className="bg-coffee-secondary hover:bg-yellow-600 text-coffee-dark px-8 py-4 rounded-full font-medium text-center transform transition-transform hover:scale-105 shadow-lg"
              >
                View Our Menu
              </Link>
              <Link
                to="/menu"
                className="border-2 border-white text-white hover:bg-white hover:text-coffee-dark px-8 py-4 rounded-full font-medium text-center transition-colors"
              >
                Shop Coffee Beans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-coffee-dark mb-4 md:mb-0 relative">
              Featured Products
              <span className="absolute -bottom-2 left-0 w-20 h-1 bg-coffee-secondary"></span>
          </h2>
            <Link to="/menu" className="text-coffee-primary hover:text-coffee-dark font-medium inline-flex items-center group">
              View all products
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coffee-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-16">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularProducts.length > 0 ? (
                popularProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <>
                  <div className="bg-white p-5 rounded-xl shadow-sm overflow-hidden transform transition-all hover:shadow-md hover:-translate-y-1">
                    <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                      <img 
                        src="/images/products/coffee-1.jpg"
                        alt="Ethiopian Coffee" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-coffee-primary text-white px-2 py-1 text-xs rounded-full">Best Seller</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Ethiopian Yirgacheffe</h3>
                    <p className="text-gray-500 text-sm mb-2">Light Roast, Floral Notes</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-coffee-primary">$18.95</span>
                      <button 
                        className="bg-coffee-secondary text-coffee-dark px-3 py-1 rounded-full text-sm font-medium"
                        onClick={() => handleAddToCart({
                          _id: 'eth001',
                          name: 'Ethiopian Yirgacheffe',
                          price: 18.95,
                          image: '/images/products/coffee-1.jpg',
                          description: 'Light Roast, Floral Notes',
                          countInStock: 10
                        })}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm overflow-hidden transform transition-all hover:shadow-md hover:-translate-y-1">
                    <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                      <img 
                        src="/images/products/coffee-2.jpg"
                        alt="Colombian Coffee" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Colombian Supremo</h3>
                    <p className="text-gray-500 text-sm mb-2">Medium Roast, Sweet Caramel</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-coffee-primary">$17.50</span>
                      <button 
                        className="bg-coffee-secondary text-coffee-dark px-3 py-1 rounded-full text-sm font-medium"
                        onClick={() => handleAddToCart({
                          _id: 'col001',
                          name: 'Colombian Supremo',
                          price: 17.50,
                          image: '/images/products/coffee-2.jpg',
                          description: 'Medium Roast, Sweet Caramel',
                          countInStock: 15
                        })}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm overflow-hidden transform transition-all hover:shadow-md hover:-translate-y-1">
                    <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                      <img 
                        src="/images/products/coffee-3.jpg" 
                        alt="Espresso Blend" 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-coffee-primary text-white px-2 py-1 text-xs rounded-full">New</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-coffee-dark">Signature Espresso Blend</h3>
                    <p className="text-gray-500 text-sm mb-2">Dark Roast, Chocolate, Nutty</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-coffee-primary">$19.95</span>
                      <button 
                        className="bg-coffee-secondary text-coffee-dark px-3 py-1 rounded-full text-sm font-medium"
                        onClick={() => handleAddToCart({
                          _id: 'esp001',
                          name: 'Signature Espresso Blend',
                          price: 19.95,
                          image: '/images/products/coffee-3.jpg',
                          description: 'Dark Roast, Chocolate, Nutty',
                          countInStock: 8
                        })}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Our Experience */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 relative">
              <div className="shadow-xl rounded-2xl overflow-hidden border-8 border-white relative z-20">
                <img
                  src="/images/hero/about-hero.jpg"
                  alt="Coffee Shop Interior"
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute left-8 -bottom-12 w-64 h-40 rounded-lg overflow-hidden shadow-lg z-10 border-8 border-white hidden md:block">
                <img
                  src="/images/products/coffee-4.jpg"
                  alt="Coffee Beans"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -right-4 -top-10 w-40 h-40 bg-coffee-secondary rounded-full opacity-20 hidden md:block"></div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-coffee-dark">Our Coffee Journey</h2>
              <div className="w-20 h-1 bg-coffee-secondary mb-8"></div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Since 2010, CaféDelights has been dedicated to exploring the rich and diverse world of coffee. 
                Our journey began with a simple commitment: to serve exceptional coffee in a space that feels like home.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We travel across continents to source the finest beans directly from farmers who share our passion for 
                quality and sustainability. Every batch is carefully roasted to bring out unique flavor profiles that 
                tell the story of their origin.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-coffee-primary mb-2">15+</div>
                  <div className="text-gray-600 text-sm">Bean Varieties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-coffee-primary mb-2">5</div>
                  <div className="text-gray-600 text-sm">Expert Roasters</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-coffee-primary mb-2">10k+</div>
                  <div className="text-gray-600 text-sm">Happy Customers</div>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center text-coffee-primary hover:text-coffee-dark font-medium"
              >
                Discover our story
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with Parallax */}
      <section className="py-24 relative bg-coffee-dark">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/images/products/coffee-5.jpg" 
            alt="Coffee background" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Coffee Club</h2>
            <p className="mb-8 text-gray-200">
              Subscribe for exclusive offers, brewing tips from our experts, and first access to limited edition beans.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
                className="px-5 py-3 rounded-full flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-coffee-secondary shadow-lg"
            />
            <button
              type="submit"
                className="bg-coffee-secondary hover:bg-yellow-600 text-coffee-dark px-6 py-3 rounded-full font-medium shadow-lg transform transition hover:scale-105"
            >
              Subscribe
            </button>
          </form>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-coffee-dark mb-4">
              @cafédelights
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Follow us on Instagram for daily coffee inspiration and behind-the-scenes moments
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#" className="block overflow-hidden group">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="/images/products/coffee-1.jpg" 
                  alt="Coffee Art" 
                  className="w-full h-64 object-cover transform transition-transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </a>
            <a href="#" className="block overflow-hidden group">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="/images/products/coffee-2.jpg" 
                  alt="Coffee Shop" 
                  className="w-full h-64 object-cover transform transition-transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </a>
            <a href="#" className="block overflow-hidden group">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="/images/products/coffee-3.jpg" 
                  alt="Coffee and Laptop" 
                  className="w-full h-64 object-cover transform transition-transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </a>
            <a href="#" className="block overflow-hidden group">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="/images/products/coffee-4.jpg" 
                  alt="Coffee Brewing" 
                  className="w-full h-64 object-cover transform transition-transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 