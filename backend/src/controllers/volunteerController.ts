import { Request, Response } from 'express';
import Volunteer from '../models/volunteerModel';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

export const createVolunteer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, skills } = req.body;
    const newVolunteer = new Volunteer({
      name,
      email,
      phone,
      skills,
      accepted: false
    });
    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating volunteer' });
  }
};


export const getAllVolunteers = async (req: Request, res: Response): Promise<void> => {
  try {
    const volunteers = await Volunteer.find({});
    res.status(200).json(volunteers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching volunteers' });
  }
};


export const acceptVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await Volunteer.findByIdAndUpdate(
      id,
      { accepted: true },
      { new: true }
    );
    if (!updated) {
      res.status(404).json({ error: 'Volunteer not found' });
      return;
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     
        pass: process.env.EMAIL_PASS,
      },
    })
    console.log(updated);
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: updated.email,
      subject: 'Volunteer Acceptance',
      text: `Hi ${updated.name},\n\nYou’ve been accepted as a volunteer! 🎉\n\nWe’ll get in touch with further steps soon.\n\nThanks,\nHuman Team Foundation`,
    }

    await transporter.sendMail(mailOptions)
    transporter.verify((error, success) => {
      if (error) {
        console.error("Transporter error:", error);
      } else {
        console.log("Server is ready to take messages");
      }
    });
    

    res.json({ message: 'Volunteer accepted and email sent.', updated })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating volunteer' });
  }
};


export const patchVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { accepted: true },
      { new: true }
    )
    if (!volunteer) {
      res.status(404).json({ error: 'Volunteer not found' });
      return ;
    }
    res.json(volunteer)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update volunteer' })
  }
}
