"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = __importDefault(require("./models/Product"));
const BlogPost_1 = __importDefault(require("./models/BlogPost"));
const User_1 = __importDefault(require("./models/User"));
const Order_1 = __importDefault(require("./models/Order"));
dotenv_1.default.config();
// Connection to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected for seeding...'))
    .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
});
// Sample user for blog posts
const createSampleUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if admin user already exists
        const existingUser = yield User_1.default.findOne({ email: 'admin@example.com' });
        if (existingUser) {
            console.log('Admin user already exists, using existing user');
            return existingUser;
        }
        // Create admin user
        const adminUser = yield User_1.default.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123', // would be hashed by the User model
            isAdmin: true
        });
        console.log('Admin user created successfully');
        return adminUser;
    }
    catch (error) {
        console.error('Error creating admin user:', error);
        throw error;
    }
});
// Create a test user
const createTestUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if test user already exists
        const existingUser = yield User_1.default.findOne({ email: 'user@example.com' });
        if (existingUser) {
            console.log('Test user already exists, using existing user');
            return existingUser;
        }
        // Create test user
        const testUser = yield User_1.default.create({
            name: 'Test User',
            email: 'user@example.com',
            password: 'password123', // would be hashed by the User model
            isAdmin: false
        });
        console.log('Test user created successfully');
        return testUser;
    }
    catch (error) {
        console.error('Error creating test user:', error);
        throw error;
    }
});
// Create test orders for the user
const createSampleOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Starting to create sample orders...');
        // Clear existing orders
        yield Order_1.default.deleteMany({});
        console.log('Cleared existing orders');
        // Get test user
        const testUser = yield User_1.default.findOne({ email: 'user@example.com' });
        if (!testUser) {
            console.log('Test user not found, cannot create orders');
            return;
        }
        console.log('Found test user:', testUser.email);
        // Get some products to use in orders
        const products = yield Product_1.default.find({}).limit(3);
        if (products.length === 0) {
            console.log('No products found, cannot create orders');
            return;
        }
        console.log(`Found ${products.length} products for orders`);
        // Create sample orders
        const orders = [
            {
                user: testUser._id,
                orderItems: [
                    {
                        name: products[0].name,
                        qty: 2,
                        image: products[0].image,
                        price: products[0].price,
                        product: products[0]._id,
                    },
                ],
                shippingAddress: {
                    address: '123 Coffee St',
                    city: 'Brew City',
                    postalCode: '12345',
                    country: 'Coffeeland',
                },
                paymentMethod: 'MetaMask',
                totalPrice: products[0].price * 2,
                isPaid: true,
                paidAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
                isDelivered: true,
                deliveredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
            },
            {
                user: testUser._id,
                orderItems: [
                    {
                        name: products[1].name,
                        qty: 1,
                        image: products[1].image,
                        price: products[1].price,
                        product: products[1]._id,
                    },
                    {
                        name: products[2].name,
                        qty: 3,
                        image: products[2].image,
                        price: products[2].price,
                        product: products[2]._id,
                    },
                ],
                shippingAddress: {
                    address: '456 Espresso Ave',
                    city: 'Brew City',
                    postalCode: '12345',
                    country: 'Coffeeland',
                },
                paymentMethod: 'MetaMask',
                totalPrice: products[1].price + (products[2].price * 3),
                isPaid: true,
                paidAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                isDelivered: false,
                createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
            },
            {
                user: testUser._id,
                orderItems: [
                    {
                        name: products[0].name,
                        qty: 1,
                        image: products[0].image,
                        price: products[0].price,
                        product: products[0]._id,
                    },
                ],
                shippingAddress: {
                    address: '789 Latte Lane',
                    city: 'Bean Town',
                    postalCode: '54321',
                    country: 'Coffeeland',
                },
                paymentMethod: 'MetaMask',
                totalPrice: products[0].price,
                isPaid: false,
                isDelivered: false,
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            },
        ];
        yield Order_1.default.insertMany(orders);
        console.log('Sample orders created successfully');
    }
    catch (error) {
        console.error('Error creating sample orders:', error);
    }
});
// Sample products data
const sampleProducts = [
    // Coffee category
    {
        name: 'Classic Espresso',
        description: 'Our signature espresso blend with notes of chocolate and caramel. Rich, bold, and perfect for any time of day.',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1287&auto=format&fit=crop',
        category: 'coffee',
        countInStock: 100,
    },
    {
        name: 'Vanilla Latte',
        description: 'Smooth espresso with steamed milk and vanilla syrup, finished with a light layer of foam.',
        price: 4.75,
        image: 'https://images.unsplash.com/photo-1582202736842-ef53a2e5d0dc?q=80&w=1139&auto=format&fit=crop',
        category: 'coffee',
        countInStock: 85,
    },
    {
        name: 'Caramel Macchiato',
        description: 'Espresso with steamed milk, vanilla syrup, and caramel drizzle for a sweet, indulgent treat.',
        price: 5.25,
        image: 'https://images.unsplash.com/photo-1561882558-17a9152d8bf2?q=80&w=1332&auto=format&fit=crop',
        category: 'coffee',
        countInStock: 70,
    },
    {
        name: 'Cold Brew',
        description: 'Coffee grounds steeped in cold water for 18 hours, producing a smooth, low-acid coffee experience.',
        price: 4.50,
        image: 'https://images.unsplash.com/photo-1593443291927-66ae5193aeb9?q=80&w=1335&auto=format&fit=crop',
        category: 'coffee',
        countInStock: 60,
    },
    // Tea category
    {
        name: 'Jasmine Green Tea',
        description: 'Premium green tea leaves scented with jasmine blossoms for a fragrant, refreshing cup.',
        price: 3.75,
        image: 'https://images.unsplash.com/photo-1594631054009-a4dd2c63767a?q=80&w=1287&auto=format&fit=crop',
        category: 'tea',
        countInStock: 90,
    },
    {
        name: 'Chai Tea Latte',
        description: 'Spiced black tea blended with steamed milk for a warming, aromatic beverage.',
        price: 4.50,
        image: 'https://images.unsplash.com/photo-1599749001441-5f2c21eef457?q=80&w=1287&auto=format&fit=crop',
        category: 'tea',
        countInStock: 75,
    },
    {
        name: 'Earl Grey',
        description: 'Black tea infused with oil of bergamot, creating a citrusy, sophisticated flavor profile.',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?q=80&w=1287&auto=format&fit=crop',
        category: 'tea',
        countInStock: 95,
    },
    {
        name: 'Matcha Latte',
        description: 'Stone-ground Japanese green tea powder whisked with steamed milk for an energizing treat.',
        price: 5.25,
        image: 'https://images.unsplash.com/photo-1545518514-ce8448f54c0f?q=80&w=1287&auto=format&fit=crop',
        category: 'tea',
        countInStock: 65,
    },
    // Pastries category
    {
        name: 'Almond Croissant',
        description: 'Buttery, flaky croissant filled with almond cream and topped with sliced almonds.',
        price: 4.25,
        image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1287&auto=format&fit=crop',
        category: 'pastries',
        countInStock: 40,
    },
    {
        name: 'Chocolate Chip Cookie',
        description: 'Large, chewy cookie packed with semi-sweet chocolate chunks and a hint of sea salt.',
        price: 2.75,
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1287&auto=format&fit=crop',
        category: 'pastries',
        countInStock: 50,
    },
    {
        name: 'Blueberry Muffin',
        description: 'Moist, tender muffin bursting with fresh blueberries and topped with a crunchy streusel.',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=1336&auto=format&fit=crop',
        category: 'pastries',
        countInStock: 35,
    },
    {
        name: 'Cinnamon Roll',
        description: 'Soft, spiral-shaped pastry with cinnamon filling, topped with cream cheese frosting.',
        price: 4.50,
        image: 'https://images.unsplash.com/photo-1606755456577-4565660a9392?q=80&w=1287&auto=format&fit=crop',
        category: 'pastries',
        countInStock: 30,
    },
    // Lunch category
    {
        name: 'Avocado Toast',
        description: 'Toasted artisan bread topped with smashed avocado, cherry tomatoes, feta, and microgreens.',
        price: 8.95,
        image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=1287&auto=format&fit=crop',
        category: 'lunch',
        countInStock: 25,
    },
    {
        name: 'Chicken Pesto Sandwich',
        description: 'Grilled chicken breast with pesto, provolone, roasted red peppers, and arugula on ciabatta.',
        price: 10.50,
        image: 'https://images.unsplash.com/photo-1626078299034-94cd8dfd5a4c?q=80&w=1287&auto=format&fit=crop',
        category: 'lunch',
        countInStock: 20,
    },
    {
        name: 'Mediterranean Salad',
        description: 'Mixed greens with cucumbers, tomatoes, red onions, olives, feta cheese, and lemon vinaigrette.',
        price: 9.75,
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1287&auto=format&fit=crop',
        category: 'lunch',
        countInStock: 30,
    },
    {
        name: 'Tomato Basil Soup',
        description: 'Creamy soup made with roasted tomatoes, fresh basil, and a touch of cream. Served with bread.',
        price: 5.95,
        image: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=1287&auto=format&fit=crop',
        category: 'lunch',
        countInStock: 40,
    },
];
// Sample blog posts data
const createSampleBlogPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Helper function to create slug from title
    const createSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };
    return [
        {
            title: 'The Art of Coffee Brewing: Pour-Over Methods',
            slug: createSlug('The Art of Coffee Brewing: Pour-Over Methods'),
            excerpt: 'Learn the techniques behind a perfect pour-over coffee and how different variables affect the final cup.',
            content: `
        <p>Pour-over coffee brewing has gained immense popularity among coffee enthusiasts for its ability to highlight the nuanced flavors of specialty beans. When done correctly, this method produces a clean, flavorful cup that showcases the unique characteristics of the coffee's origin.</p>
        
        <h2>The Essential Equipment</h2>
        <p>Before diving into technique, you'll need:</p>
        <ul>
          <li>A pour-over dripper (Hario V60, Chemex, or Kalita Wave)</li>
          <li>Appropriate filters for your dripper</li>
          <li>A gooseneck kettle for precise pouring</li>
          <li>A burr grinder for consistent grind size</li>
          <li>A scale for measuring coffee and water</li>
          <li>Freshly roasted beans</li>
        </ul>
        
        <h2>The Perfect Ratio</h2>
        <p>Start with a coffee-to-water ratio of 1:16 (such as 15g coffee to 240g water). This can be adjusted based on your preference for strength.</p>
        
        <h2>The Technique</h2>
        <p>The pour-over process can be broken down into four key phases:</p>
        <ol>
          <li><strong>The Bloom:</strong> Initially pour just enough water (about twice the weight of the coffee) to saturate all grounds. Wait 30-45 seconds to allow CO2 to escape.</li>
          <li><strong>First Pour:</strong> Slowly add water in a circular motion, starting from the center and moving outward, avoiding the edges of the filter.</li>
          <li><strong>Middle Pours:</strong> Add water in pulses, maintaining the water level in the dripper.</li>
          <li><strong>Final Pour:</strong> Complete your target water weight, ensuring all grounds have been evenly extracted.</li>
        </ol>
        
        <p>Variables that affect your brew include water temperature (ideally 195-205°F), grind size (medium-fine for V60, medium for Chemex), pouring technique, and the quality of your water.</p>
        
        <p>With practice, you'll develop an intuitive understanding of how to adjust these variables to craft the perfect cup that suits your palate.</p>
      `,
            author: userId,
            authorName: 'Coffee Expert',
            authorRole: 'Head Barista',
            authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1170&auto=format&fit=crop',
            category: 'Brewing',
            tags: ['coffee', 'brewing', 'pour-over', 'techniques'],
            readTime: 6,
            published: true,
            date: new Date('2023-09-15')
        },
        {
            title: 'Seasonal Coffee Drinks: Fall Favorites',
            slug: createSlug('Seasonal Coffee Drinks: Fall Favorites'),
            excerpt: 'Explore our favorite autumn-inspired coffee drinks that bring warmth and comfort as the weather cools.',
            content: `
        <p>As the leaves begin to change and temperatures drop, it's time to transition from refreshing iced beverages to warming, spiced coffee drinks that capture the essence of fall. Our café has developed several seasonal specialties that have become customer favorites year after year.</p>
        
        <h2>Spiced Pumpkin Latte</h2>
        <p>Our take on the classic fall favorite uses real pumpkin puree and a house-made spice blend of cinnamon, nutmeg, clove, and ginger. We sweeten it lightly with maple syrup rather than processed sugar for a more complex flavor profile that complements the espresso beautifully.</p>
        
        <h2>Maple Cinnamon Cappuccino</h2>
        <p>This sophisticated drink features our signature espresso blend with steamed milk infused with a touch of real maple syrup and cinnamon. The microfoam is dusted with a hint of freshly grated cinnamon for an aromatic experience with each sip.</p>
        
        <h2>Cardamom Rose Mocha</h2>
        <p>For something different, our cardamom rose mocha combines rich chocolate with the floral notes of rose and the warming spice of freshly ground cardamom. It's an unusual but compelling combination that's gained a dedicated following.</p>
        
        <h2>Toasted Hazelnut Cortado</h2>
        <p>Our cortado—equal parts espresso and silky steamed milk—gets a fall makeover with house-made toasted hazelnut syrup. The nutty flavor complements the natural hazelnut notes in our espresso blend for a harmonious, satisfying drink.</p>
        
        <p>All of these seasonal specials are available with plant-based milk alternatives and can be adjusted to your sweetness preference. They'll be on our menu through November, so come in and find your new fall favorite!</p>
      `,
            author: userId,
            authorName: 'Seasonal Menu Developer',
            authorRole: 'Café Manager',
            authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop',
            image: 'https://images.unsplash.com/photo-1508766247069-435a2483791e?q=80&w=1170&auto=format&fit=crop',
            category: 'Seasonal',
            tags: ['coffee', 'seasonal', 'fall', 'recipes'],
            readTime: 5,
            published: true,
            date: new Date('2023-10-05')
        },
        {
            title: 'Understanding Coffee Origins: Ethiopia',
            slug: createSlug('Understanding Coffee Origins: Ethiopia'),
            excerpt: 'Discover the birthplace of coffee and how Ethiopian beans continue to set the standard for exceptional flavor profiles.',
            content: `
        <p>Ethiopia, widely recognized as the birthplace of coffee, produces some of the most extraordinary and distinctive coffees in the world. The country's diverse growing regions, ancient varieties, and traditional processing methods contribute to complex flavor profiles that have captivated coffee lovers for centuries.</p>
        
        <h2>The Legend of Kaldi</h2>
        <p>Coffee's discovery is often attributed to a goat herder named Kaldi, who noticed his goats becoming energetic after eating berries from a certain tree. After trying the berries himself and experiencing their energizing effects, he brought them to a monastery where monks created a drink that helped them stay awake during prayer—thus beginning humanity's long relationship with coffee.</p>
        
        <h2>Key Growing Regions</h2>
        <p>Ethiopia's main coffee regions each produce beans with distinctive characteristics:</p>
        
        <h3>Yirgacheffe</h3>
        <p>Perhaps the most famous Ethiopian region, Yirgacheffe coffees are known for their floral, citrusy, and often tea-like qualities. When washed processed, they exhibit remarkable clarity and elegance with jasmine, bergamot, and lemon notes.</p>
        
        <h3>Sidamo</h3>
        <p>Coffees from this southern region often display sweet berry notes, particularly blueberry, along with a syrupy body when naturally processed. Washed Sidamos tend to show more citrus qualities with a clean finish.</p>
        
        <h3>Guji</h3>
        <p>A sub-region that has gained recognition for producing exceptional coffees with complex fruit notes, wine-like qualities, and distinctive floral aromatics.</p>
        
        <h3>Harrar</h3>
        <p>From the eastern part of Ethiopia, these naturally processed coffees are known for their heavy body, spice notes, and distinctive wild berry or fruit punch characteristics.</p>
        
        <h2>Processing Methods</h2>
        <p>Ethiopia is known for both washed and natural processing, with each method highlighting different aspects of the beans. Natural processing, where the coffee cherry is dried whole around the bean, brings out fruity, wine-like qualities, while washed processing produces cleaner, more articulated floral notes.</p>
        
        <p>Our café regularly features Ethiopian coffees in our single-origin offerings, and we encourage coffee enthusiasts to experience these remarkable beans that represent coffee's ancient heritage and modern excellence.</p>
      `,
            author: userId,
            authorName: 'Origin Expert',
            authorRole: 'Green Coffee Buyer',
            authorImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1287&auto=format&fit=crop',
            image: 'https://images.unsplash.com/photo-1658978520763-bd677865e020?q=80&w=1288&auto=format&fit=crop',
            category: 'Origins',
            tags: ['coffee', 'ethiopia', 'origins', 'education'],
            readTime: 7,
            published: true,
            date: new Date('2023-08-20')
        },
        {
            title: 'Home Brewing Tips: Perfecting Your Morning Routine',
            slug: createSlug('Home Brewing Tips: Perfecting Your Morning Routine'),
            excerpt: 'Simple adjustments to transform your daily coffee ritual into an exceptional experience, no matter what brewing method you use.',
            content: `
        <p>Whether you're a French press devotee, pour-over enthusiast, or espresso aficionado, there are universal principles that can elevate your home brewing experience. These recommendations focus on variables that make the biggest impact on quality with minimal additional effort.</p>
        
        <h2>Water Quality Matters Most</h2>
        <p>Coffee is approximately 98% water, making water quality perhaps the single most important factor in brewing great coffee. Filtered water with a balanced mineral content (130-150 ppm total dissolved solids) brings out the best flavors without introducing off-notes or scaling your equipment.</p>
        
        <h2>Invest in a Quality Grinder</h2>
        <p>A consistent grind size is crucial for even extraction. Burr grinders, while more expensive than blade grinders, provide the consistency needed for predictable, delicious results. If budget is a concern, consider a quality hand grinder, which can outperform electric blade grinders at a similar price point.</p>
        
        <h2>Buy Fresh, Buy Whole Bean</h2>
        <p>Coffee reaches its peak flavor 3-14 days after roasting and begins declining noticeably after 3-4 weeks. Purchase beans from roasters who date their packages, and only grind what you need immediately before brewing to preserve aromatic compounds.</p>
        
        <h2>Dial In Your Recipe</h2>
        <p>Start with a standard coffee-to-water ratio of 1:16 to 1:17 by weight (about 60g coffee per liter of water), then adjust to taste. Being consistent with your measurements ensures reproducible results when you find what works for you.</p>
        
        <h2>Temperature Control</h2>
        <p>For most brewing methods, water temperature should be between 195°F and 205°F (90-96°C). Too cool and you'll under-extract, resulting in sour, weak coffee; too hot and you risk over-extraction and bitterness.</p>
        
        <h2>The Importance of Time</h2>
        <p>Each brewing method has an ideal contact time between water and coffee. For pour-overs, aim for 2.5-3.5 minutes total brew time; for French press, 4 minutes; for AeroPress, 1-2 minutes. Timing affects extraction significantly and is worth tracking.</p>
        
        <p>Remember that brewing great coffee at home is both an art and a science. While these guidelines provide a solid foundation, don't be afraid to experiment and adjust based on your preferences. The perfect cup is ultimately the one you enjoy most.</p>
      `,
            author: userId,
            authorName: 'Home Brewing Specialist',
            authorRole: 'Barista Trainer',
            authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop',
            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1169&auto=format&fit=crop',
            category: 'Brewing',
            tags: ['coffee', 'brewing', 'home', 'tips'],
            readTime: 6,
            published: true,
            date: new Date('2023-11-10')
        },
    ];
});
// Seed database
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear existing data
        yield Product_1.default.deleteMany({});
        yield BlogPost_1.default.deleteMany({});
        // Create admin user for blog posts
        const user = yield createSampleUser();
        // Create test user for login functionality
        yield createTestUser();
        console.log('Test user for login created/verified');
        // Insert products
        yield Product_1.default.insertMany(sampleProducts);
        console.log('Products seeded successfully');
        // Create sample orders for test user
        yield createSampleOrders();
        // Create and insert blog posts
        const blogPostsData = yield createSampleBlogPosts(user._id);
        yield BlogPost_1.default.insertMany(blogPostsData);
        console.log('Blog posts seeded successfully');
        console.log('Database seeded successfully!');
        process.exit();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
});
// Run the seed function
seedDatabase();
