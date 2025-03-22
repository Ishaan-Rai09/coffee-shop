import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../state/cartSlice';
import { RootState } from '../state/store';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
}

// Static menu items for fallback - similar to the ones in MenuPage
const staticProducts = [
  // This is just a subset for fallback, the full list is in MenuPage.tsx
  {
    _id: 'espresso',
    id: 'espresso',
    name: 'Espresso',
    description: 'Our signature blend, featuring notes of chocolate and caramel with a smooth finish.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1740&auto=format&fit=crop',
    category: 'coffee',
    countInStock: 20
  },
  {
    _id: 'cappuccino',
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and silky microfoam.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1740&auto=format&fit=crop',
    category: 'coffee',
    countInStock: 20
  },
  // Add more items as needed
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          try {
            // Try to get product from API
            const data = await getProductById(id);
            setProduct(data);
          } catch (apiError) {
            console.error("API Error:", apiError);
            
            // Look for product in static data as fallback
            const staticProduct = staticProducts.find(p => p._id === id || p.id === id);
            
            if (staticProduct) {
              setProduct({
                _id: staticProduct._id || staticProduct.id || '',
                name: staticProduct.name,
                description: staticProduct.description,
                price: staticProduct.price,
                image: staticProduct.image,
                category: staticProduct.category,
                countInStock: staticProduct.countInStock
              });
            } else {
              setError('Product not found. Please try another product.');
            }
          }
        }
        setLoading(false);
      } catch (err: any) {
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (product) {
      if (isAuthenticated) {
        // Dispatch to Redux store with all necessary fields
        dispatch(addToCart({
          id: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: qty,
          description: product.description,
          countInStock: product.countInStock
        }));
        
        // Navigate to cart page
        navigate('/cart');
      } else {
        // Redirect to login with return to this product page
        navigate(`/login?redirect=product/${id}`);
      }
    }
  };

  return (
    <div className="bg-coffee-light py-16 min-h-screen">
      <div className="container mx-auto px-4">
        <Link to="/menu" className="text-coffee-primary hover:underline mb-8 inline-block">
          &larr; Back to Menu
        </Link>

        {loading ? (
          <div className="text-center py-12">
            <div className="spinner mb-4"></div>
            Loading product details...
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
            <div className="mt-4">
              <Link to="/menu" className="bg-coffee-primary text-white px-4 py-2 rounded">
                Return to Menu
              </Link>
            </div>
          </div>
        ) : !product ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Product not found</p>
            <Link to="/menu" className="bg-coffee-primary text-white px-4 py-2 rounded">
              Return to Menu
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/600x400/8B4513/FFFFFF?text=' + encodeURIComponent(product.name);
                  }}
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-coffee-dark mb-4">{product.name}</h1>
                <p className="text-gray-700 mb-6">{product.description}</p>
                <div className="flex items-center mb-6">
                  <span className="text-2xl font-bold text-coffee-primary">${product.price.toFixed(2)}</span>
                  <span className="ml-4 px-3 py-1 bg-coffee-secondary text-coffee-dark rounded-full text-sm">
                    {product.category}
                  </span>
                </div>

                {product.countInStock > 0 ? (
                  <>
                    <div className="mb-6">
                      <label htmlFor="qty" className="block text-gray-700 mb-2">
                        Quantity
                      </label>
                      <select
                        id="qty"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:border-coffee-primary"
                      >
                        {Array.from({length: Math.min(10, product.countInStock)}, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={addToCartHandler}
                      className="w-full bg-coffee-primary hover:bg-coffee-dark text-white py-3 px-6 rounded-md font-medium"
                    >
                      {isAuthenticated ? 'Add to Cart' : 'Sign in to Add to Cart'}
                    </button>
                    
                    {!isAuthenticated && (
                      <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
                        <p>You need to be signed in to add items to your cart.</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-red-600 font-medium mb-6">Out of Stock</div>
                )}

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-coffee-dark">
                    Recommended Pairings
                  </h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Chocolate Croissant</li>
                    <li>Blueberry Muffin</li>
                    <li>Almond Biscotti</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage; 