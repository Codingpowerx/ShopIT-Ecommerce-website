const cloudinary = require('cloudinary');

const dotenv = require('dotenv');
const connectDB = require('./config/database')

const app = require('./app');

//handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`)
  console.log('Shutting down server due to uncaught exception')
  process.exit(1)
})

//setting up config file
dotenv.config({ path: 'backend/config/config.env' });

// connecting to database
connectDB();

/// setting up cloudinary config 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

//handle unhandled promise rejection

process.on('unhandledRejection', err => {
  console.log(`ERROR: ${err.message}`)
  console.log('Shutting down the server due to unhandled promise rejection')
  server.close(() => {
    process.exit(1);
  })
})