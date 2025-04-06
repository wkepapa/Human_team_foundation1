import { Request, Response } from 'express';
import Donation from '../models/donationModel';

export const createDonation = async (req: Request, res: Response) => {
  try {
    const { fullName, email, amount, method } = req.body;

    const newDonation = new Donation({
      name: fullName,
      email,
      amount,
      message: method, 
    });

    await newDonation.save();
    console.log("Donation received:", newDonation);

    res.status(201).json({ message: 'Donation created successfully', donation: newDonation });
  } catch (err) {
    console.error("Error creating donation:", err);
    res.status(500).json({ error: 'Error creating donation' });
  }
};
