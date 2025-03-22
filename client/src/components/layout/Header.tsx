import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { logout } from '../../services/api';
import { clearUser } from '../../state/userSlice';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.user);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    dispatch(clearUser());
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-coffee-primary font-bold text-xl">CaféDelights</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-coffee-primary">Home</Link>
            <Link to="/menu" className="text-gray-800 hover:text-coffee-primary font-medium">Menu</Link>
            <Link to="/blog" className="text-gray-800 hover:text-coffee-primary">Blog</Link>
            <Link to="/about" className="text-gray-800 hover:text-coffee-primary">About</Link>
            <Link to="/contact" className="text-gray-800 hover:text-coffee-primary">Contact</Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-800 hover:text-coffee-primary relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-coffee-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity > 99 ? '99+' : totalQuantity}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              {isAuthenticated ? (
                <button 
                  className="flex items-center text-gray-800 hover:text-coffee-primary"
                  onClick={toggleUserDropdown}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-full bg-coffee-primary text-white flex items-center justify-center mr-2">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline font-medium">{currentUser.name}</span>
                </button>
              ) : (
                <Link to="/login" className="text-gray-800 hover:text-coffee-primary">
                  <UserIcon className="h-6 w-6" />
                </Link>
              )}
              
              {/* User Dropdown Menu */}
              {isAuthenticated && isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-1">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            
            <button 
              aria-label="Toggle menu"
              className="md:hidden text-gray-800 hover:text-coffee-primary"
              onClick={toggleMenu}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white absolute top-16 left-0 right-0 z-50 shadow-md">
            <div className="flex justify-end px-4 py-2">
              <button 
                aria-label="Close menu"
                onClick={toggleMenu}
              >
                <XMarkIcon className="h-6 w-6 text-gray-800" />
              </button>
            </div>
            <nav className="flex flex-col px-4 py-2">
              <Link 
                to="/" 
                className="py-2 text-gray-800 hover:text-coffee-primary"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className="py-2 text-gray-800 hover:text-coffee-primary font-medium"
                onClick={toggleMenu}
              >
                Menu
              </Link>
              <Link 
                to="/blog" 
                className="py-2 text-gray-800 hover:text-coffee-primary"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link 
                to="/about" 
                className="py-2 text-gray-800 hover:text-coffee-primary"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="py-2 text-gray-800 hover:text-coffee-primary"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              
              {isAuthenticated ? (
                <>
                  <div className="py-2 border-t border-gray-200 mt-2">
                    <span className="block text-sm font-medium text-gray-900">{currentUser.name}</span>
                    <span className="block text-sm text-gray-500">{currentUser.email}</span>
                  </div>
                  <Link 
                    to="/profile" 
                    className="py-2 text-gray-800 hover:text-coffee-primary"
                    onClick={toggleMenu}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="py-2 text-gray-800 hover:text-coffee-primary"
                    onClick={toggleMenu}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="py-2 text-left text-gray-800 hover:text-coffee-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="py-2 text-gray-800 hover:text-coffee-primary"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
              
              <Link 
                to="/cart" 
                className="py-2 text-gray-800 hover:text-coffee-primary"
                onClick={toggleMenu}
              >
                Cart {totalQuantity > 0 && `(${totalQuantity})`}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 