const Product = require('../models/product')
const dotenv = require('dotenv');
const connectDB = require('../config/database');

const products = require('../data/products');

//setting dotenv files
dotenv.config({ path: 'backend/config/config.env' });

connectDB();

const seedProducts = async (req, res, next) => {
    try {
        await Product.deleteMany();
        console.log('Product deleted successfully')

        await Product.insertMany(products);
        console.log('Product inserted successfully')

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()