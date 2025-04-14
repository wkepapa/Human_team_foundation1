import { Request, Response } from "express";
import Event from "../models/eventModel";
import { uploadOnCloudinary } from "../utils/cloudinary";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const imageUrl = req.file ? await uploadOnCloudinary(req.file.path) : "";

    const newEvent = new Event({
      ...req.body,
      imageUrl: imageUrl,
    });

    await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
