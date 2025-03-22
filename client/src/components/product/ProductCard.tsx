import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../state/cartSlice';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    countInStock?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Local images for fallbacks (using import statements would be better in a real app)
  const localImages = [
    "/images/products/coffee-1.jpg",
    "/images/products/coffee-2.jpg",
    "/images/products/coffee-3.jpg", 
    "/images/products/coffee-4.jpg",
    "/images/products/coffee-5.jpg"
  ];
  
  // Get a consistent fallback image based on product ID
  const getFallbackImage = () => {
    const charCodeSum = product._id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return localImages[charCodeSum % localImages.length];
  };
  
  // Use local image if remote fails
  const imageUrl = imageError ? getFallbackImage() : (product.image || getFallbackImage());

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Dispatch to Redux store
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      image: imageUrl,
      price: product.price,
      description: product.description,
      quantity: 1,
      countInStock: product.countInStock || 10
    }));
    
    // Optionally show a toast notification
    alert(`${product.name} added to cart!`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`} className="block relative">
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className={`w-full h-64 object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            onError={() => {
              setImageError(true);
            }}
            loading="lazy"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-coffee-primary text-white text-xs font-medium px-2 py-1 rounded-full">New</span>
          )}
          {product.isBestSeller && (
            <span className="bg-coffee-secondary text-coffee-dark text-xs font-medium px-2 py-1 rounded-full">Best Seller</span>
          )}
        </div>
        
        {/* Hover overlay with quick add button */}
        <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
          <button 
            onClick={handleQuickView}
            className="bg-white text-coffee-dark hover:bg-coffee-secondary px-6 py-2 rounded-full text-sm font-medium transform transition-transform duration-300 hover:scale-105"
            aria-label={`Quick view ${product.name}`}
          >
            Quick View
          </button>
        </div>
      </Link>
      
      <div className="p-5">
        {product.category && (
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</div>
        )}
        
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-semibold mb-2 text-coffee-dark hover:text-coffee-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 text-sm overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-coffee-primary">${product.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-coffee-secondary hover:bg-yellow-600 text-coffee-dark px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 