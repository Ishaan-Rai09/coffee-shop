import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, getProductById } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../state/cartSlice';
import { RootState } from '../state/store';

interface MenuItem {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  countInStock: number;
}

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('coffee');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const categories = [
    { id: 'coffee', name: 'Coffee', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-.993-.883l-.007-.117a1 1 0 01.801-1.058.5.5 0 00.398-.492V13.5a.5.5 0 01.5-.5h2.499a3.001 3.001 0 01-5.422-1.942 1 1 0 01.61-1.276A.75.75 0 0110 9.75l.008.273a1 1 0 01-.61 1.034zM2.25 10.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clipRule="evenodd" />
      </svg>
    ) },
    { id: 'tea', name: 'Tea', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.207 9.207a1 1 0 010-1.414L6 5a1 1 0 011.414 0l2.793 2.793a1 1 0 010 1.414L7.414 12A1 1 0 016 12l-2.793-2.793zM14 5a1 1 0 00-1.414 0L9.793 7.793a1 1 0 000 1.414L12.586 12a1 1 0 001.414 0l2.793-2.793a1 1 0 000-1.414L14 5z" clipRule="evenodd" />
      </svg>
    ) },
    { id: 'pastries', name: 'Pastries', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
      </svg>
    ) },
    { id: 'lunch', name: 'Lunch', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.795.077 1.584.24 2.287.586.544.267.99.638 1.384 1.074a3.156 3.156 0 01.722 1.321c.88.028.158.086.196.159l.008-.032c.044.095.055.193.04.281-.011.066-.04.128-.082.183-.042.056-.094.103-.155.136-.59.033-.126.051-.195.052H3.04a.593.593 0 01-.208-.052 1.004 1.004 0 01-.155-.136.61.61 0 01-.073-.183.456.456 0 01.04-.281l.008.032a.274.274 0 00.195-.16 3.164 3.164 0 01.723-1.32 4.764 4.764 0 011.384-1.075A8.09 8.09 0 016 4.193V3.75zm2.75-1.25a1.25 1.25 0 00-1.25 1.25v.25h3v-.25a1.25 1.25 0 00-1.25-1.25h-2.5zM13.5 13a.5.5 0 01.5.5v.25h1.5a.75.75 0 110 1.5h-7.5a.75.75 0 010-1.5H9.5V13.5a.5.5 0 01.5-.5h3.5zm-2 .5v.25h1v-.25a.5.5 0 00-.5-.5h-1.5z" clipRule="evenodd" />
      </svg>
    ) },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts('', activeCategory);
        
        if (data && data.products && data.products.length > 0) {
          setMenuItems(data.products);
        } else {
          // Fallback to static data if API fails or returns empty
          setMenuItems(staticMenuItems.filter(item => 
            activeCategory === 'all' || item.category === activeCategory));
        }
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        // Fallback to static data on error
        setMenuItems(staticMenuItems.filter(item => 
          activeCategory === 'all' || item.category === activeCategory));
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const addToCartHandler = (item: MenuItem) => {
    if (isAuthenticated) {
      dispatch(addToCart({
        id: item._id || item.id || '',
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: 1,
        description: item.description,
        countInStock: item.countInStock || 10
      }));
      
      // Show a toast or notification
      alert(`${item.name} added to cart!`);
    } else {
      // Redirect to login with return to menu page
      navigate('/login?redirect=menu');
    }
  };

  const viewProductDetails = (item: MenuItem) => {
    // Fixed navigation to product details page
    const productId = item._id || item.id || '';
    
    // First check if we can get the product from the API
    if (productId) {
      getProductById(productId)
        .then(product => {
          navigate(`/product/${productId}`);
        })
        .catch(err => {
          // If API fails, still navigate but with static data in state
          // This lets the product page use static data as fallback
          navigate(`/product/${productId}`);
        });
    } else {
      // Handle case where no ID is available
      console.error('No product ID available');
      // Maybe show an error toast or message
    }
  };

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  // Static menu items as fallback with real images
  const staticMenuItems: MenuItem[] = [
    // Coffee section
    {
      _id: 'espresso',
      id: 'espresso',
      name: 'Espresso',
      description: 'Our signature blend, featuring notes of chocolate and caramel with a smooth finish.',
      price: 3.50,
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1740&auto=format&fit=crop',
      category: 'coffee',
      tags: ['signature', 'classics'],
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
      tags: ['popular', 'classics'],
      countInStock: 20
    },
    {
      _id: 'latte',
      id: 'latte',
      name: 'Café Latte',
      description: 'Espresso with steamed milk and a light layer of foam. Available in various flavors.',
      price: 4.75,
      image: 'https://images.unsplash.com/photo-1593443320739-77f74939d0da?q=80&w=1936&auto=format&fit=crop',
      category: 'coffee',
      tags: ['popular', 'classics'],
      countInStock: 20
    },
    {
      _id: 'mocha',
      id: 'mocha',
      name: 'Mocha',
      description: 'Espresso with rich chocolate, steamed milk, and whipped cream.',
      price: 5.25,
      image: 'https://images.unsplash.com/photo-1578314675229-731597cf5e9a?q=80&w=1935&auto=format&fit=crop',
      category: 'coffee',
      tags: ['popular'],
      countInStock: 20
    },
    {
      _id: 'americano',
      id: 'americano',
      name: 'Americano',
      description: 'Espresso diluted with hot water, creating a coffee similar to drip but with a different flavor profile.',
      price: 3.75,
      image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=1887&auto=format&fit=crop',
      category: 'coffee',
      tags: ['classics'],
      countInStock: 20
    },
    {
      _id: 'coldbrew',
      id: 'coldbrew',
      name: 'Cold Brew',
      description: 'Coffee grounds steeped in cold water for 18 hours, producing a smooth, less acidic brew.',
      price: 4.50,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1738&auto=format&fit=crop',
      category: 'coffee',
      tags: ['seasonal', 'popular'],
      countInStock: 20
    },
    {
      _id: 'pourover',
      id: 'pourover',
      name: 'Pour Over',
      description: 'Single-origin coffee brewed by hand, highlighting the unique characteristics of each bean.',
      price: 5.00,
      image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=1784&auto=format&fit=crop',
      category: 'coffee',
      tags: ['specialty'],
      countInStock: 20
    },
    {
      _id: 'flatwhite',
      id: 'flatwhite',
      name: 'Flat White',
      description: 'Espresso with velvety microfoam steamed milk, creating a smooth texture and rich flavor.',
      price: 4.75,
      image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1887&auto=format&fit=crop',
      category: 'coffee',
      tags: ['specialty'],
      countInStock: 20
    },
    
    // Tea section
    {
      _id: 'earlgrey',
      id: 'earlgrey',
      name: 'Earl Grey',
      description: 'Classic black tea flavored with oil of bergamot, producing a fragrant and distinctive brew.',
      price: 3.75,
      image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=1887&auto=format&fit=crop',
      category: 'tea',
      countInStock: 20
    },
    {
      _id: 'greentea',
      id: 'greentea',
      name: 'Japanese Green Tea',
      description: 'High-quality sencha green tea with a fresh, grassy flavor and subtle sweetness.',
      price: 3.75,
      image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=1170&auto=format&fit=crop',
      category: 'tea',
      countInStock: 20
    },
    {
      _id: 'chaitea',
      id: 'chaitea',
      name: 'Masala Chai',
      description: 'Black tea infused with aromatic spices, served with steamed milk.',
      price: 4.50,
      image: 'https://images.unsplash.com/photo-1547825407-2d060104b7f8?q=80&w=1170&auto=format&fit=crop',
      category: 'tea',
      tags: ['popular'],
      countInStock: 20
    },
    {
      _id: 'herbal',
      id: 'herbal',
      name: 'Herbal Infusion',
      description: 'Caffeine-free blend of herbs and flowers, changes seasonally.',
      price: 3.75,
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1170&auto=format&fit=crop',
      category: 'tea',
      countInStock: 20
    },
    {
      _id: 'oolongtea',
      id: 'oolongtea',
      name: 'Oolong Tea',
      description: 'Semi-oxidized tea with complex flavors between green and black tea.',
      price: 4.25,
      image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=1170&auto=format&fit=crop',
      category: 'tea',
      tags: ['specialty'],
      countInStock: 20
    },
    {
      _id: 'matchalatte',
      id: 'matchalatte',
      name: 'Matcha Latte',
      description: 'Stone-ground premium matcha whisked with steamed milk.',
      price: 5.25,
      image: 'https://images.unsplash.com/photo-1516224498413-84ecf3a1e7fd?q=80&w=1170&auto=format&fit=crop',
      category: 'tea',
      tags: ['popular'],
      countInStock: 20
    },
    {
      _id: 'roiboos',
      id: 'roiboos',
      name: 'Rooibos Tea',
      description: 'Naturally caffeine-free South African tea with a sweet, nutty flavor.',
      price: 3.75,
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1170&auto=format&fit=crop',
      category: 'tea',
      countInStock: 20
    },
    {
      _id: 'whitetea',
      id: 'whitetea',
      name: 'White Peony Tea',
      description: 'Delicate tea with subtle floral notes and natural sweetness.',
      price: 4.50,
      image: 'https://images.unsplash.com/photo-1531970227416-f0cddeb1f748?q=80&w=1170&auto=format&fit=crop',
      category: 'tea',
      countInStock: 20
    },
    
    // Pastries section
    {
      _id: 'croissant',
      id: 'croissant',
      name: 'Butter Croissant',
      description: 'Flaky, buttery layers in the classic French style, baked fresh daily.',
      price: 3.25,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1026&auto=format&fit=crop',
      category: 'pastries',
      tags: ['popular', 'classics'],
      countInStock: 15
    },
    {
      _id: 'muffin',
      id: 'muffin',
      name: 'Blueberry Muffin',
      description: 'Moist muffin loaded with fresh blueberries and topped with a crunchy streusel.',
      price: 3.50,
      image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=1170&auto=format&fit=crop',
      category: 'pastries',
      countInStock: 15
    },
    {
      _id: 'cookie',
      id: 'cookie',
      name: 'Chocolate Chip Cookie',
      description: 'Large, chewy cookie with a generous amount of chocolate chunks.',
      price: 2.75,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1064&auto=format&fit=crop',
      category: 'pastries',
      tags: ['popular'],
      countInStock: 20
    },
    {
      _id: 'scone',
      id: 'scone',
      name: 'Mixed Berry Scone',
      description: 'Tender, flaky scone filled with seasonal berries and finished with a light glaze.',
      price: 3.75,
      image: 'https://images.unsplash.com/photo-1585273883977-d3297ff23a73?q=80&w=1170&auto=format&fit=crop',
      category: 'pastries',
      countInStock: 15
    },
    {
      _id: 'danish',
      id: 'danish',
      name: 'Apricot Danish',
      description: 'Sweet danish pastry with apricot filling and almond glaze.',
      price: 3.95,
      image: 'https://images.unsplash.com/photo-1617196701537-7329482cc9fe?q=80&w=1257&auto=format&fit=crop',
      category: 'pastries',
      countInStock: 15
    },
    {
      _id: 'brownie',
      id: 'brownie',
      name: 'Double Chocolate Brownie',
      description: 'Rich fudge brownie with chocolate chunks and walnuts.',
      price: 3.50,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1287&auto=format&fit=crop',
      category: 'pastries',
      tags: ['popular'],
      countInStock: 20
    },
    {
      _id: 'cinnamonroll',
      id: 'cinnamonroll',
      name: 'Cinnamon Roll',
      description: 'Soft, spiraled pastry with cinnamon filling and cream cheese frosting.',
      price: 4.25,
      image: 'https://images.unsplash.com/photo-1583530272631-604be9af394c?q=80&w=1287&auto=format&fit=crop',
      category: 'pastries',
      tags: ['popular'],
      countInStock: 15
    },
    {
      _id: 'macaron',
      id: 'macaron',
      name: 'French Macarons',
      description: 'Delicate almond meringue cookies with various fillings, assorted flavors.',
      price: 2.50,
      image: 'https://images.unsplash.com/photo-1569476930346-159c7ea8a888?q=80&w=1579&auto=format&fit=crop',
      category: 'pastries',
      tags: ['specialty'],
      countInStock: 20
    },
    
    // Lunch section
    {
      _id: 'avocadotoast',
      id: 'avocadotoast',
      name: 'Avocado Toast',
      description: 'Artisan sourdough bread topped with smashed avocado, cherry tomatoes, and microgreens.',
      price: 7.95,
      image: 'https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?q=80&w=1287&auto=format&fit=crop',
      category: 'lunch',
      tags: ['popular', 'healthy'],
      countInStock: 10
    },
    {
      _id: 'turkeysandwich',
      id: 'turkeysandwich',
      name: 'Turkey & Brie Sandwich',
      description: 'Roasted turkey, creamy brie, cranberry spread, and arugula on a fresh baguette.',
      price: 9.50,
      image: 'https://images.unsplash.com/photo-1544352453-5e1c6fae890c?q=80&w=1287&auto=format&fit=crop',
      category: 'lunch',
      countInStock: 10
    },
    {
      _id: 'vegwrap',
      id: 'vegwrap',
      name: 'Vegetable Wrap',
      description: 'Hummus, roasted vegetables, feta cheese, and mixed greens in a spinach tortilla.',
      price: 8.75,
      image: 'https://images.unsplash.com/photo-1584255014406-2a5edddd7db4?q=80&w=1287&auto=format&fit=crop',
      category: 'lunch',
      tags: ['vegetarian', 'healthy'],
      countInStock: 10
    },
    {
      _id: 'soup',
      id: 'soup',
      name: 'Soup of the Day',
      description: 'Housemade soup prepared daily. Ask our staff for today\'s selection.',
      price: 5.50,
      image: 'https://images.unsplash.com/photo-1605883705077-8d3d4117e6fa?q=80&w=1287&auto=format&fit=crop',
      category: 'lunch',
      countInStock: 10
    },
    {
      _id: 'quinoasalad',
      id: 'quinoasalad',
      name: 'Quinoa Power Bowl',
      description: 'Protein-rich quinoa with roasted sweet potatoes, kale, chickpeas, and tahini dressing.',
      price: 10.95,
      image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1287&auto=format&fit=crop',
      category: 'lunch',
      tags: ['vegetarian', 'healthy'],
      countInStock: 10
    },
    {
      _id: 'caprese',
      id: 'caprese',
      name: 'Caprese Panini',
      description: 'Fresh mozzarella, tomatoes, basil, and balsamic glaze on grilled focaccia.',
      price: 8.95,
      image: 'https://images.unsplash.com/photo-1648961237757-93d8fbcd2dc3?q=80&w=1287&auto=format&fit=crop',
      category: 'lunch',
      tags: ['vegetarian'],
      countInStock: 10
    },
    {
      _id: 'chickensalad',
      id: 'chickensalad',
      name: 'Harvest Chicken Salad',
      description: 'Grilled chicken, mixed greens, apples, walnuts, and goat cheese with honey vinaigrette.',
      price: 11.50,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop',
      category: 'lunch',
      tags: ['popular', 'healthy'],
      countInStock: 10
    },
    {
      _id: 'quiche',
      id: 'quiche',
      name: 'Spinach & Feta Quiche',
      description: 'Flaky pastry crust filled with spinach, feta, and egg custard. Served with side salad.',
      price: 9.25,
      image: 'https://images.unsplash.com/photo-1535585125987-36ffdec8d0c8?q=80&w=1287&auto=format&fit=crop',
      category: 'lunch',
      tags: ['vegetarian'],
      countInStock: 10
    },
  ];

  return (
    <div className="bg-coffee-light min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-coffee-dark">Our Menu</h1>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Discover our carefully crafted selection of beverages and food, 
          made with quality ingredients and attention to detail.
        </p>

        {/* Category navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full shadow-md p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                  activeCategory === category.id
                    ? 'bg-coffee-primary text-white'
                    : 'text-coffee-dark hover:bg-gray-100'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="spinner"></div>
            <p className="mt-4">Loading menu items...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          /* Menu grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item._id || item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div 
                  className="h-48 overflow-hidden relative cursor-pointer"
                  onClick={() => viewProductDetails(item)}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/600x400/8B4513/FFFFFF?text=' + encodeURIComponent(item.name);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                    <h3 className="text-white text-2xl font-bold p-4 w-full text-center drop-shadow-lg">
                      {item.name}
                    </h3>
                  </div>
                  <div className="absolute top-3 right-3 bg-coffee-primary text-white font-bold px-3 py-1 rounded-full shadow-md">
                    ${item.price.toFixed(2)}
                  </div>
                  {item.tags && item.tags.includes('popular') && (
                    <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs uppercase font-bold px-3 py-1 rounded-full shadow-md">
                      Popular
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => viewProductDetails(item)}
                      className="text-coffee-primary hover:underline text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => addToCartHandler(item)}
                      className="bg-coffee-primary hover:bg-coffee-dark text-white px-4 py-2 rounded-lg transition"
                    >
                      {isAuthenticated ? 'Add to Cart' : 'Sign in to Add'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cart Link - Fixed Button */}
        <div className="fixed bottom-8 right-8">
          <Link
            to="/cart"
            className="flex items-center justify-center bg-coffee-primary text-white w-16 h-16 rounded-full shadow-lg hover:bg-coffee-dark transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuPage; 