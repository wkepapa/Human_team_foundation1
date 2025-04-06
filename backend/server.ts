import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import donationRoutes from './src/routes/donationRoutes';
import reviewRoutes from './src/routes/reviewRoutes';
import volunteerRoutes from './src/routes/volunteerRoutes';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for all origins
app.use(cors());  // This should come before the routes

app.use(express.json());  // Middleware to parse JSON request bodies

// Use routes
app.use('/api/donations', donationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Connect to MongoDB using the environment variable for the connection string
mongoose.connect(process.env.MONGO_URI as string, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
