import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';
import BlogPost from '../models/BlogPost';

// Load env vars
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error(err));

// Sample user data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    isAdmin: false,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    isAdmin: false,
  },
];

// Sample coffee product data
const products = [
  {
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and milk foam',
    price: 4.75,
    image: '/images/cappuccino.jpg',
    category: 'Hot Coffee',
    countInStock: 100,
  },
  {
    name: 'Latte',
    description: 'Smooth espresso with steamed milk and a light layer of foam',
    price: 4.50,
    image: '/images/latte.jpg',
    category: 'Hot Coffee',
    countInStock: 100,
  },
  {
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk, topped with whipped cream',
    price: 5.25,
    image: '/images/mocha.jpg',
    category: 'Hot Coffee',
    countInStock: 100,
  },
  {
    name: 'Americano',
    description: 'Espresso shots diluted with hot water',
    price: 3.75,
    image: '/images/americano.jpg',
    category: 'Hot Coffee',
    countInStock: 100,
  },
  {
    name: 'Espresso',
    description: 'Pure and rich espresso shot with crema',
    price: 2.75,
    image: '/images/espresso.jpg',
    category: 'Hot Coffee',
    countInStock: 100,
  },
  {
    name: 'Caramel Macchiato',
    description: 'Vanilla-flavored drink marked with espresso and caramel drizzle',
    price: 5.50,
    image: '/images/caramel-macchiato.jpg',
    category: 'Hot Coffee',
    countInStock: 100,
  },
  {
    name: 'Iced Coffee',
    description: 'Chilled coffee served over ice with optional milk and sweetener',
    price: 4.00,
    image: '/images/iced-coffee.jpg',
    category: 'Iced Coffee',
    countInStock: 100,
  },
  {
    name: 'Iced Latte',
    description: 'Espresso with cold milk served over ice',
    price: 4.75,
    image: '/images/iced-latte.jpg',
    category: 'Iced Coffee',
    countInStock: 100,
  },
  {
    name: 'Chocolate Croissant',
    description: 'Fresh baked chocolate-filled pastry',
    price: 3.50,
    image: '/images/chocolate-croissant.jpg',
    category: 'Pastries',
    countInStock: 50,
  },
];

// Sample blog post data
const blogPosts = [
  {
    title: 'The Origins of Coffee: A Journey Through History',
    slug: 'the-origins-of-coffee-a-journey-through-history',
    excerpt: 'Discover the fascinating history of coffee, from its ancient Ethiopian origins to its global spread.',
    content: `
      <p>Coffee, one of the world's most beloved beverages, has a rich and fascinating history that spans centuries and continents. The story of coffee begins in Ethiopia, where, according to legend, a goat herder named Kaldi first discovered the potential of these special beans.</p>
      
      <h2>The Legend of Kaldi</h2>
      <p>The story goes that Kaldi noticed his goats becoming unusually energetic after eating berries from a certain tree. Curious about this phenomenon, Kaldi tried the berries himself and experienced a similar burst of energy. He brought these berries to a local monastery, where the monks made a drink with them, which helped them stay alert during long hours of prayer.</p>
      
      <h2>Spread to the Arabian Peninsula</h2>
      <p>By the 15th century, coffee was being grown in the Yemeni district of Arabia, and by the 16th century, it was known in Persia, Egypt, Syria, and Turkey. Coffee was not only enjoyed in homes but also in the many public coffee houses that began to appear in cities across the Near East. These coffee houses quickly became centers of social activity and communication in the major cities of England, Austria, France, Germany, and Holland.</p>
      
      <h2>Coffee Comes to Europe</h2>
      <p>European travelers to the Near East brought back stories of an unusual dark black beverage. By the 17th century, coffee had made its way to Europe and was becoming popular across the continent. Despite some initial controversy and suspicion, coffee houses were quickly becoming centers of social activity and communication in the major cities of England, Austria, France, Germany, and Holland.</p>
      
      <h2>New World Plantations</h2>
      <p>As demand for the beverage continued to spread, there was fierce competition to cultivate coffee outside of Arabia. The Dutch finally succeeded in obtaining seedlings in the latter half of the 17th century. Their first attempts to plant them in India failed, but they were successful with their efforts in Batavia, on the island of Java in what is now Indonesia.</p>
      
      <h2>Coffee Today</h2>
      <p>Today, coffee is a global commodity second only to oil in terms of dollar value. It's cultivated in more than 70 countries, primarily in the equatorial regions of the Americas, Southeast Asia, the Indian subcontinent, and Africa. Coffee continues to evolve, with specialty coffees defining a new industry focused on quality, origin, and craft. The story of coffee is still being written, with each cup telling a tale of history, culture, and human connection.</p>
    `,
    authorName: 'Maria Johnson',
    authorRole: 'Coffee Historian',
    authorImage: '/images/blog/authors/maria.jpg',
    image: '/images/blog/coffee-origins.jpg',
    category: 'history',
    tags: ['coffee', 'history', 'culture'],
    readTime: 7,
    date: new Date('2023-06-15')
  },
  {
    title: 'Comparing Brewing Methods: Pour Over vs. French Press',
    slug: 'comparing-brewing-methods-pour-over-vs-french-press',
    excerpt: 'An in-depth look at two popular brewing methods and how they affect the flavor profile of your coffee.',
    content: `
      <p>When it comes to brewing coffee at home, two methods stand out for their popularity and contrasting approaches: the pour over and the French press. Each method produces distinctly different results, and understanding these differences can help you choose the perfect brewing technique for your taste preferences.</p>
      
      <h2>Pour Over Brewing</h2>
      <p>The pour over method involves pouring hot water over coffee grounds in a filter. The water drains through the grounds and filter into a carafe or cup, producing a clean, bright cup of coffee.</p>
      
      <h3>Equipment Needed:</h3>
      <ul>
        <li>Pour over dripper (like Hario V60, Chemex, or Kalita Wave)</li>
        <li>Paper filters</li>
        <li>Kettle (preferably with a gooseneck spout for controlled pouring)</li>
        <li>Scale for measuring coffee and water</li>
        <li>Timer</li>
      </ul>
      
      <h3>Flavor Profile:</h3>
      <p>Pour over coffee tends to have a cleaner, more delicate taste with enhanced clarity of flavor. The paper filter removes most of the oils and sediment, resulting in a lighter-bodied cup that highlights the nuanced, subtle notes of the coffee—particularly the bright, fruity, or floral aspects.</p>
      
      <h2>French Press Brewing</h2>
      <p>The French press, also known as a press pot or plunger pot, is an immersion brewing method where coffee grounds steep directly in hot water before being separated by a metal mesh filter.</p>
      
      <h3>Equipment Needed:</h3>
      <ul>
        <li>French press brewer</li>
        <li>Kettle for heating water</li>
        <li>Scale for measuring coffee and water</li>
        <li>Timer</li>
      </ul>
      
      <h3>Flavor Profile:</h3>
      <p>French press produces a full-bodied, rich cup with more pronounced oils and sometimes sediment. The metal filter allows oils and fine particles to remain in the coffee, creating a heavier mouthfeel and often emphasizing deeper notes like chocolate, nuts, and spices.</p>
      
      <h2>Key Differences</h2>
      <p>The fundamental difference between these methods is filtration. Pour over uses a paper filter that removes oils and sediment, while French press uses a metal mesh that allows these elements to remain in the final cup. This difference in filtration is primarily responsible for the contrasting flavor profiles and mouthfeel of each brewing method.</p>
      
      <h2>Which Method is Right for You?</h2>
      <p>Choose pour over if you prefer a cleaner, lighter-bodied cup that highlights bright and complex flavors. This method is ideal for single-origin coffees with distinctive characteristics you want to explore.</p>
      
      <p>Choose French press if you enjoy a full-bodied, robust cup with a rich mouthfeel. This method works particularly well with darker roasts and coffees with chocolate or nutty flavor profiles.</p>
      
      <p>Ultimately, the "better" method is entirely subjective and depends on your personal preference. Many coffee enthusiasts own both brewing devices and choose between them based on the specific coffee they're brewing or the experience they're seeking that day.</p>
    `,
    authorName: 'James Wilson',
    authorRole: 'Head Barista',
    authorImage: '/images/blog/authors/james.jpg',
    image: '/images/blog/brewing-methods.jpg',
    category: 'brewing',
    tags: ['brewing', 'techniques', 'equipment'],
    readTime: 5,
    date: new Date('2023-07-03')
  },
  {
    title: 'The Importance of Sustainable Coffee Farming',
    slug: 'the-importance-of-sustainable-coffee-farming',
    excerpt: 'How sustainable farming practices impact coffee quality, farmer livelihoods, and the environment.',
    content: `
      <p>Coffee is one of the world's most traded commodities, supporting the livelihoods of over 25 million farmers globally. However, conventional coffee farming practices can lead to deforestation, soil degradation, water pollution, and biodiversity loss. Sustainable coffee farming offers an alternative approach that benefits the environment, farmers, and coffee quality.</p>
      
      <h2>Environmental Benefits</h2>
      <p>Sustainable coffee farming practices help protect and restore ecosystems in several ways:</p>
      
      <h3>Shade-Grown Coffee</h3>
      <p>Unlike sun-grown coffee plantations that often require forest clearing, shade-grown coffee is cultivated under a canopy of trees. This approach:</p>
      <ul>
        <li>Preserves forest habitats and biodiversity</li>
        <li>Provides habitat for birds and other wildlife</li>
        <li>Reduces the need for chemical fertilizers as leaf litter naturally enriches the soil</li>
        <li>Helps prevent soil erosion and improves water retention</li>
      </ul>
      
      <h3>Organic Farming Practices</h3>
      <p>Sustainable coffee farms often use organic methods that avoid synthetic pesticides and fertilizers. Instead, they employ natural solutions such as:</p>
      <ul>
        <li>Composting and natural fertilizers</li>
        <li>Biological pest control</li>
        <li>Crop rotation and diversification</li>
      </ul>
      
      <h3>Water Conservation</h3>
      <p>Sustainable farms implement water-efficient processing methods and protect local water sources from contamination, ensuring clean water remains available for both farm operations and local communities.</p>
      
      <h2>Socioeconomic Benefits for Farmers</h2>
      
      <h3>Fair Compensation</h3>
      <p>Sustainable coffee often commands premium prices, especially when certified through programs like Fair Trade, Rainforest Alliance, or Organic. These premiums help ensure farmers receive fair compensation for their crops.</p>
      
      <h3>Community Development</h3>
      <p>Many sustainable coffee initiatives include community development programs, such as:</p>
      <ul>
        <li>Educational opportunities</li>
        <li>Healthcare access</li>
        <li>Infrastructure improvements</li>
      </ul>
      
      <h3>Long-term Viability</h3>
      <p>By preserving soil health and biodiversity, sustainable practices ensure coffee farms remain productive for generations, providing stable income sources for farming communities.</p>
      
      <h2>Impact on Coffee Quality</h2>
      <p>Sustainable farming practices often result in superior coffee quality for several reasons:</p>
      
      <h3>Slower Maturation</h3>
      <p>Shade-grown coffee cherries mature more slowly, allowing fuller development of sugars and flavors.</p>
      
      <h3>Healthier Plants</h3>
      <p>Coffee plants grown in biodiverse environments with healthy soil tend to produce better cherries with more complex flavor profiles.</p>
      
      <h3>Careful Processing</h3>
      <p>Sustainable farms often emphasize quality at every stage, from selective harvesting to meticulous processing.</p>
      
      <h2>How Consumers Can Support Sustainable Coffee</h2>
      <p>As a coffee consumer, you can support sustainable practices by:</p>
      <ul>
        <li>Looking for certifications like Rainforest Alliance, Fair Trade, or USDA Organic</li>
        <li>Buying from roasters and cafes that transparently source their beans</li>
        <li>Being willing to pay a bit more for coffee that's produced responsibly</li>
        <li>Learning about the origins of your coffee and the conditions under which it was grown</li>
      </ul>
      
      <p>By choosing sustainably grown coffee, you're not just enjoying a better-tasting cup—you're also supporting environmental conservation and improved livelihoods for coffee farming communities around the world.</p>
    `,
    authorName: 'Sophia Rodriguez',
    authorRole: 'Sustainability Expert',
    authorImage: '/images/blog/authors/sophia.jpg',
    image: '/images/blog/sustainable-farming.jpg',
    category: 'sustainability',
    tags: ['sustainability', 'farming', 'environment', 'quality'],
    readTime: 6,
    date: new Date('2023-08-12')
  },
];

// Import sample data to DB
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await BlogPost.deleteMany({});

    // Create users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Add admin user reference to products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert products
    await Product.insertMany(sampleProducts);

    // Add admin user reference to blog posts
    const sampleBlogPosts = blogPosts.map((post) => {
      return { ...post, author: adminUser };
    });

    // Insert blog posts
    await BlogPost.insertMany(sampleBlogPosts);

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// Delete all data from DB
const destroyData = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await BlogPost.deleteMany({});

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// Determine which function to run based on command line arg
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 