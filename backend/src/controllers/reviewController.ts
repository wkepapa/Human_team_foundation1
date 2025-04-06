import { Request, Response } from "express";
import Review from "../models/reviewModel";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { name, rating, comment } = req.body;
    const newReview = new Review({ name, rating, comment });
    await newReview.save();
    res.status(201).json({ message: "Review created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error creating review" });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
};
