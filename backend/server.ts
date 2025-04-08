import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import donationRoutes from "./src/routes/donationRoutes";
import reviewRoutes from "./src/routes/reviewRoutes";
import getAllVolunteers from "./src/routes/volunteerRoutes";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for all origins
app.use(cors()); // This should come before the routes

app.use(express.json()); // Middleware to parse JSON request bodies

// Use routes
app.use("/api/donations", donationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/volunteers", getAllVolunteers);

mongoose
  .connect(process.env.MONGO_URI as string, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
