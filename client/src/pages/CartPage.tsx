import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../state/cartSlice';

interface ProductToAdd {
  _id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  quantity?: number;
  countInStock?: number;
}

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items: cartItems, totalQuantity, totalAmount } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Calculate cart totals - now using Redux state values
  const itemsPrice = totalAmount;
  const taxPrice = itemsPrice * 0.1; // 10% tax
  const shippingPrice = itemsPrice > 50 ? 0 : 10; // Free shipping over $50
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  // Handle a new product being added from another page
  useEffect(() => {
    if (location.state?.product) {
      const product = location.state.product;
      dispatch(addToCart({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: product.quantity || 1,
        description: product.description,
        countInStock: product.countInStock || 10
      }));
      
      // Clear location state to prevent re-adding when navigating back
      navigate(location.pathname, { replace: true, state: {} });
    }
    
    setLoading(false);
  }, [location.state, navigate, location.pathname, dispatch]);
  
  // Add product to cart (handled by Redux)
  const handleAddToCart = (product: ProductToAdd) => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      description: product.description,
      countInStock: product.countInStock || 10 // Default to 10 if not provided
    }));
  };

  // Remove product from cart
  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Update quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    const item = cartItems.find(item => item.id === id);
    if (item && (!item.countInStock || quantity <= item.countInStock)) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  // Clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Handle checkout navigation
  const proceedToCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      // Redirect to login with redirect parameter back to checkout
      navigate('/login?redirect=checkout');
    }
  };

  return (
    <div className="bg-coffee-light min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-coffee-dark">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-lg mb-6">Your cart is empty</p>
            <Link 
              to="/menu"
              className="inline-block bg-coffee-primary hover:bg-coffee-dark text-white py-2 px-4 rounded-md font-medium"
            >
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 lg:mb-0">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center">
                      <div className="sm:flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full sm:w-24 h-24 object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://placehold.co/600x400/8B4513/FFFFFF?text=' + encodeURIComponent(item.name);
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-coffee-dark mb-2">{item.name}</h3>
                        <p className="text-coffee-primary font-medium mb-4">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                                }
                              }}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            
                            <span className="px-4 py-1">{item.quantity}</span>
                            
                            <button
                              onClick={() => {
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
                              }}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Remove item"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-200">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalQuantity} items)</span>
                    <span>${itemsPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${taxPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-4 mt-4">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-coffee-primary hover:bg-coffee-dark text-white py-3 px-4 rounded-md font-medium"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>

                {!isAuthenticated && cartItems.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
                    <p className="mb-2"><strong>Note:</strong> You need to be signed in to complete your purchase.</p>
                    <Link to="/login?redirect=checkout" className="text-blue-600 hover:underline font-medium">
                      Sign in here
                    </Link>
                  </div>
                )}
                
                {cartItems.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear the cart?')) {
                        dispatch(clearCart());
                      }
                    }}
                    className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;