import { Request, Response } from 'express';
import Event from '../models/eventModel';
import axios from 'axios';

// Function to post to Instagram (2-step process)
const postToInstagram = async (eventData: any) => {
  try {
    const igUserId = process.env.IG_USER_ID;
    const accessToken = process.env.IG_ACCESS_TOKEN;

    if (!igUserId || !accessToken) {
      throw new Error('Missing IG_USER_ID or IG_ACCESS_TOKEN in environment variables');
    }

    // Step 1: Create media container
    const mediaResponse = await axios.post(
      `https://graph.facebook.com/v19.0/${igUserId}/media`,
      {
        image_url: eventData.imageUrl,
        caption: `${eventData.name} - ${eventData.description}`,
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
    console.error('Error posting to Instagram:', err.response?.data || err.message);
    throw new Error('Instagram post failed');
  }
};

// Controller to create event and post to Instagram
export const createEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();

    const instagramPostSuccess = await postToInstagram(req.body);

    if (instagramPostSuccess) {
      res.status(201).json({ message: 'Event created and posted to Instagram successfully' });
    } else {
      res.status(500).json({ error: 'Event created, but failed to post to Instagram' });
    }
  } catch (err) {
    console.error('Event creation error:', err);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Controller to fetch events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};
