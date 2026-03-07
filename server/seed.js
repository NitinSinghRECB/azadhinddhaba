require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const Admin = require('./models/Admin');
const Settings = require('./models/Settings');

const menuData = [
    // Breakfast & Snacks
    { name: 'Kulhad Tea', category: 'Breakfast & Snacks', price: 20, isVeg: true, popular: true },
    { name: 'Cutting Tea', category: 'Breakfast & Snacks', price: 15, isVeg: true },
    { name: 'Cup Tea', category: 'Breakfast & Snacks', price: 30, isVeg: true },
    { name: 'Kulhad Coffee', category: 'Breakfast & Snacks', price: 30, isVeg: true },
    { name: 'Cup Coffee', category: 'Breakfast & Snacks', price: 40, isVeg: true },
    { name: 'Paneer Pakoda', category: 'Breakfast & Snacks', price: 250, isVeg: true, popular: true },
    { name: 'Onion Pakoda', category: 'Breakfast & Snacks', price: 100, isVeg: true },
    { name: 'Bread Pakoda', category: 'Breakfast & Snacks', price: 60, isVeg: true },
    { name: 'Bun Makkhan', category: 'Breakfast & Snacks', price: 30, isVeg: true },
    { name: 'Bread Makkhan', category: 'Breakfast & Snacks', price: 10, isVeg: true },
    { name: 'Malai Bun', category: 'Breakfast & Snacks', price: 50, isVeg: true },

    // Burger & Sandwich
    { name: 'Veg Burger', category: 'Burger & Sandwich', price: 30, isVeg: true },
    { name: 'Egg Burger', category: 'Burger & Sandwich', price: 50, isVeg: false },
    { name: 'Paneer Burger', category: 'Burger & Sandwich', price: 70, isVeg: true },
    { name: 'Chicken Burger', category: 'Burger & Sandwich', price: 60, isVeg: false },
    { name: 'Veg Sandwich', category: 'Burger & Sandwich', price: 50, isVeg: true },
    { name: 'Paneer Sandwich', category: 'Burger & Sandwich', price: 80, isVeg: true },
    { name: 'Egg Sandwich', category: 'Burger & Sandwich', price: 70, isVeg: false },
    { name: 'Chicken Sandwich', category: 'Burger & Sandwich', price: 70, isVeg: false },

    // Rolls
    { name: 'Veg Roll', category: 'Rolls', price: 50, isVeg: true },
    { name: 'Egg Roll', category: 'Rolls', price: 70, isVeg: false },
    { name: 'Paneer Roll', category: 'Rolls', price: 70, isVeg: true },
    { name: 'Chicken Roll', category: 'Rolls', price: 90, isVeg: false, popular: true },
    { name: 'Chicken Egg Roll', category: 'Rolls', price: 110, isVeg: false },

    // Paratha
    { name: 'Aloo Paratha', category: 'Paratha', price: 40, isVeg: true, popular: true },
    { name: 'Onion Paratha', category: 'Paratha', price: 50, isVeg: true },
    { name: 'Paneer Paratha', category: 'Paratha', price: 70, isVeg: true, popular: true },
    { name: 'Gobhi Paratha', category: 'Paratha', price: 50, isVeg: true },
    { name: 'Laccha Paratha', category: 'Paratha', price: 40, isVeg: true },
    { name: 'Plain Paratha', category: 'Paratha', price: 25, isVeg: true },
    { name: 'Chicken Paratha', category: 'Paratha', price: 90, isVeg: false },

    // Chinese & Fast Food
    { name: 'Veg Fried Rice', category: 'Chinese & Fast Food', price: 80, isVeg: true },
    { name: 'Paneer Fried Rice', category: 'Chinese & Fast Food', price: 120, isVeg: true },
    { name: 'Egg Fried Rice', category: 'Chinese & Fast Food', price: 100, isVeg: false },
    { name: 'Chicken Fried Rice', category: 'Chinese & Fast Food', price: 110, isVeg: false, popular: true },
    { name: 'Egg Chicken Fried Rice', category: 'Chinese & Fast Food', price: 130, isVeg: false },

    // Noodles
    { name: 'Veg Hakka Noodles', category: 'Noodles', price: 100, isVeg: true },
    { name: 'Paneer Hakka Noodles', category: 'Noodles', price: 130, isVeg: true },
    { name: 'Chicken Hakka Noodles', category: 'Noodles', price: 120, isVeg: false },
    { name: 'Egg Hakka Noodles', category: 'Noodles', price: 120, isVeg: false },

    // Chowmein
    { name: 'Veg Chowmein', category: 'Chowmein', price: 80, isVeg: true },
    { name: 'Paneer Chowmein', category: 'Chowmein', price: 110, isVeg: true },
    { name: 'Chicken Chowmein', category: 'Chowmein', price: 100, isVeg: false },
    { name: 'Egg Chowmein', category: 'Chowmein', price: 100, isVeg: false },
    { name: 'Egg Chicken Chowmein', category: 'Chowmein', price: 130, isVeg: false },

    // Momos
    { name: 'Crunchy Veg Momos', category: 'Momos', price: 130, isVeg: true },
    { name: 'Veg Momos', category: 'Momos', price: 100, isVeg: true, popular: true },
    { name: 'Chicken Momos', category: 'Momos', price: 150, isVeg: false, popular: true },
    { name: 'Chicken Crunchy Momos', category: 'Momos', price: 180, isVeg: false },
    { name: 'Chilli Veg Momos', category: 'Momos', price: 150, isVeg: true },
    { name: 'Chilli Chicken Momos', category: 'Momos', price: 200, isVeg: false },

    // Veg Main Course
    { name: 'Dal Fry', category: 'Veg Main Course', price: 120, isVeg: true },
    { name: 'Dal Tadka', category: 'Veg Main Course', price: 120, isVeg: true, popular: true },
    { name: 'Mix Veg', category: 'Veg Main Course', price: 130, isVeg: true },
    { name: 'Chilli Paneer', category: 'Veg Main Course', price: 180, priceHalf: 180, priceFull: 300, isVeg: true, popular: true },
    { name: 'Kadai Paneer', category: 'Veg Main Course', price: 180, priceHalf: 180, priceFull: 300, isVeg: true },
    { name: 'Paneer Butter Masala', category: 'Veg Main Course', price: 180, priceHalf: 180, priceFull: 300, isVeg: true, popular: true },
    { name: 'Paneer Bhurji', category: 'Veg Main Course', price: 250, isVeg: true },
    { name: 'Shahi Paneer', category: 'Veg Main Course', price: 180, priceHalf: 180, priceFull: 300, isVeg: true },
    { name: 'Matar Paneer', category: 'Veg Main Course', price: 150, priceHalf: 150, priceFull: 250, isVeg: true },
    { name: 'Paneer Do Pyaza', category: 'Veg Main Course', price: 180, priceHalf: 180, priceFull: 300, isVeg: true },
    { name: 'Veg Manchurian', category: 'Veg Main Course', price: 100, priceHalf: 100, priceFull: 180, isVeg: true },

    // Non Veg Main Course
    { name: 'Egg Curry', category: 'Non Veg Main Course', price: 120, isVeg: false },
    { name: 'Omelette Curry', category: 'Non Veg Main Course', price: 140, isVeg: false },
    { name: 'Egg Masala', category: 'Non Veg Main Course', price: 130, isVeg: false },
    { name: 'Egg Bhurji', category: 'Non Veg Main Course', price: 50, isVeg: false },
    { name: 'Chicken Curry', category: 'Non Veg Main Course', price: 180, priceHalf: 180, priceFull: 300, isVeg: false },
    { name: 'Kadai Chicken', category: 'Non Veg Main Course', price: 200, priceHalf: 200, priceFull: 350, isVeg: false },
    { name: 'Butter Chicken', category: 'Non Veg Main Course', price: 180, priceHalf: 180, priceFull: 300, isVeg: false, popular: true },
    { name: 'Chilli Chicken', category: 'Non Veg Main Course', price: 180, priceHalf: 180, priceFull: 300, isVeg: false },
    { name: 'Rara Chicken', category: 'Non Veg Main Course', price: 200, priceHalf: 200, priceFull: 350, isVeg: false },
    { name: 'Chicken Do Pyaza', category: 'Non Veg Main Course', price: 180, priceHalf: 180, priceFull: 300, isVeg: false },

    // Tandoor
    { name: 'Paneer Tikka', category: 'Tandoor', price: 250, isVeg: true },
    { name: 'Paneer Malai Tikka', category: 'Tandoor', price: 300, isVeg: true },
    { name: 'Tandoori Leg', category: 'Tandoor', price: 80, isVeg: false },
    { name: 'Chicken Wings', category: 'Tandoor', price: 150, isVeg: false },
    { name: 'Chicken Tikka', category: 'Tandoor', price: 250, isVeg: false, popular: true },
    { name: 'Tandoori Chicken', category: 'Tandoor', price: 180, priceHalf: 180, priceFull: 300, isVeg: false, popular: true },
    { name: 'Malai Tikka', category: 'Tandoor', price: 180, priceHalf: 180, priceFull: 300, isVeg: false },

    // Fried
    { name: 'Chicken Fry', category: 'Fried', price: 150, priceHalf: 150, priceFull: 250, isVeg: false },
    { name: 'Chicken Fry Boneless', category: 'Fried', price: 180, priceHalf: 180, priceFull: 350, isVeg: false },
    { name: 'KFC Chicken', category: 'Fried', price: 180, priceHalf: 180, priceFull: 350, isVeg: false },
    { name: 'KFC Boneless', category: 'Fried', price: 180, priceHalf: 180, priceFull: 350, isVeg: false },

    // Milkshakes
    { name: 'Pineapple Milkshake', category: 'Milkshakes', price: 80, isVeg: true },
    { name: 'Chocolate Milkshake', category: 'Milkshakes', price: 80, isVeg: true },
    { name: 'Badam Milkshake', category: 'Milkshakes', price: 90, isVeg: true },
    { name: 'Butterscotch Milkshake', category: 'Milkshakes', price: 90, isVeg: true },
    { name: 'Mango Milkshake', category: 'Milkshakes', price: 90, isVeg: true },
    { name: 'Kesar Ilaichi Milkshake', category: 'Milkshakes', price: 90, isVeg: true },

    // Coffee
    { name: 'Cold Coffee', category: 'Coffee', price: 70, isVeg: true },
    { name: 'Sugar Free Cold Coffee', category: 'Coffee', price: 80, isVeg: true },
    { name: 'Bournvita Cold Coffee', category: 'Coffee', price: 90, isVeg: true },
    { name: 'Chocolate Coffee', category: 'Coffee', price: 90, isVeg: true },

    // Thali
    { name: 'Normal Thali', category: 'Thali', price: 120, isVeg: true, popular: true },
    { name: 'Paneer Thali', category: 'Thali', price: 150, isVeg: true },
    { name: 'Chicken Thali', category: 'Thali', price: 150, isVeg: false },

    // Roti & Rice
    { name: 'Plain Tawa Roti', category: 'Roti & Rice', price: 10, isVeg: true },
    { name: 'Butter Roti', category: 'Roti & Rice', price: 15, isVeg: true },
    { name: 'Plain Naan', category: 'Roti & Rice', price: 30, isVeg: true },
    { name: 'Butter Naan', category: 'Roti & Rice', price: 40, isVeg: true },
    { name: 'Plain Rice', category: 'Roti & Rice', price: 60, isVeg: true },
    { name: 'Jeera Rice', category: 'Roti & Rice', price: 80, isVeg: true },

    // Salad
    { name: 'Onion Lemon', category: 'Salad', price: 20, isVeg: true },
    { name: 'Green Salad', category: 'Salad', price: 50, isVeg: true },
    { name: 'Lemon', category: 'Salad', price: 10, isVeg: true },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/azadhinddhaba');
        console.log('Connected to MongoDB');

        // Clear existing data
        await MenuItem.deleteMany({});
        await Admin.deleteMany({});
        await Settings.deleteMany({});
        console.log('Cleared existing data');

        // Seed menu items
        let sortOrder = 0;
        const itemsWithSort = menuData.map(item => ({ ...item, sortOrder: sortOrder++ }));
        await MenuItem.insertMany(itemsWithSort);
        console.log(`✅ Seeded ${itemsWithSort.length} menu items`);

        // Seed admin
        const admin = new Admin({ username: 'azad', password: 'azadbharat' });
        await admin.save();
        console.log('✅ Created admin user (username: azad, password: azadbharat)');

        // Seed settings
        await Settings.create({
            freeDeliveryRadius: 1,
            deliveryChargePerKm: 10,
            maxDeliveryRadius: 15,
            whatsappNumber: '919598181082',
            isOpen: true,
            openTime: '07:00',
            closeTime: '23:00'
        });
        console.log('✅ Created default settings');

        console.log('\n🍛 Seed complete! You can now start the server.');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
