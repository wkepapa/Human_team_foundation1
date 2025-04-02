import { Request, Response } from 'express';
import Donation from '../models/donationModel';

export const createDonation = async (req: Request, res: Response) => {
  try {
    const { name, email, amount, message } = req.body;
    const newDonation = new Donation({ name, email, amount, message });
    await newDonation.save();
    res.status(201).json({ message: 'Donation created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating donation' });
  }
};
