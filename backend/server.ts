import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import donationRoutes from './src/routes/donationRoutes';
import reviewRoutes from './src/routes/reviewRoutes';
import getAllVolunteers from './src/routes/volunteerRoutes';
import cors from 'cors';
import sendMessageRoute from './src/routes/sendMessage'

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for all origins
app.use(cors());  // This should come before the routes

app.use(express.json());  // Middleware to parse JSON request bodies

// Use routes
app.use('/api/donations', donationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/volunteers', getAllVolunteers);
app.use('/api', sendMessageRoute)

// Connect to MongoDB using the environment variable for the connection string
 mongoose.connect(process.env.MONGO_URI as string, {})
   .then(() => {
     console.log('Connected to MongoDB');
  })
  .catch((err) => {
   console.log('Error connecting to MongoDB:', err);
   });

<<<<<<< HEAD

dotenv.config();
  mongoose.connect(process.env.MONGODB_URI as string, {})
=======
/*const uri = "mongodb+srv://Meghana:hAZ1xEtnymxnmq0p@ngoapi.finfezg.mongodb.net/ngoApi?retryWrites=true&w=majority&appName=ngoApi";
  
  mongoose.connect(uri)
>>>>>>> 74267c2763e949bd7a9ba3bcc6c917a719b1b01b
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
  */

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
