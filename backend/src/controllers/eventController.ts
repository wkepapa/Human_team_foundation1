import { Request, Response } from "express";
import Event from "../models/eventModel";
import { uploadOnCloudinary } from "../utils/cloudinary";
import axios from "axios";

// Helper function to post to Instagram
const postToInstagram = async (imageUrl: string, caption: string) => {
  try {
    const igUserId = process.env.IG_USER_ID;
    const accessToken = process.env.IG_ACCESS_TOKEN;

    if (!igUserId || !accessToken) {
      throw new Error("Missing IG_USER_ID or IG_ACCESS_TOKEN");
    }

    // Step 1: Create a media container
    const mediaResponse = await axios.post(
      `https://graph.facebook.com/v19.0/${igUserId}/media`,
      {
        image_url: imageUrl,
        caption,
        access_token: accessToken,
      }
    );

    const creationId = mediaResponse.data.id;

    // Step 2: Publish media to Instagram
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v19.0/${igUserId}/media_publish`,
      {
        creation_id: creationId,
        access_token: accessToken,
      }
    );

    return publishResponse.data.id ? true : false;
  } catch (err: any) {
    console.error(
      "Error posting to Instagram:",
      err.response?.data || err.message
    );
    return false;
  }
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const uploadResult = req.file
      ? await uploadOnCloudinary(req.file.path)
      : null;
    const imageUrl = uploadResult?.secure_url || "";

    const newEvent = new Event({
      ...req.body,
      imageUrl,
    });

    await newEvent.save();

    const postToInsta: boolean = req.body.postToInstagram;

    let instagramPostSuccess = false;
    if (postToInsta && imageUrl) {
      const caption = `${newEvent.name} - ${newEvent.description}`;
      instagramPostSuccess = await postToInstagram(imageUrl, caption);
    }

    res.status(201).json({
      message: instagramPostSuccess
        ? "Event created and posted to Instagram"
        : "Event created" + (postToInsta ? " (Instagram post failed)" : ""),
      event: newEvent,
    });
  } catch (err) {
    console.error("Event creation error:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
};

// Get all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
