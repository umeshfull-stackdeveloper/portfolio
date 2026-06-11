const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & utility Middlewares
app.use(helmet());
app.use(cors({
  origin: '*', // Allow all origins for simplicity in development and deployment, can be configured in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-Admin-Password']
}));
app.use(express.json());

// Dev logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Database connection
mongoose.set('bufferCommands', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}. Continuing server execution without MongoDB.`);
  }
};

connectDB();

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is healthy and running.' });
});

// Centralized error handling
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
