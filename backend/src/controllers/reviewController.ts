import { Request, Response } from 'express';
import Review from '../models/reviewModel';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { name, rating, comment } = req.body;
    const newReview = new Review({ name, rating, comment });
    await newReview.save();
    res.status(201).json({ message: 'Review created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating review' });
  }
};
