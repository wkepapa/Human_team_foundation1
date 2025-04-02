import { Request, Response } from 'express';
import Volunteer from '../models/volunteerModel';

export const createVolunteer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, skills } = req.body;
    const newVolunteer = new Volunteer({ name, email, phone, skills });
    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating volunteer' });
  }
};
