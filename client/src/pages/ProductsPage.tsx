import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['all', 'coffee', 'tea', 'pastry', 'merchandise'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const category = activeCategory === 'all' ? '' : activeCategory;
        const data = await getProducts('', category);
        setProducts(data.products);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg capitalize ${
              activeCategory === category
                ? 'bg-amber-700 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="spinner"></div>
          <p className="mt-4">Loading products...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-700 font-bold">${product.price.toFixed(2)}</span>
                    <button className="bg-amber-700 text-white px-4 py-1 rounded hover:bg-amber-800">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage; 