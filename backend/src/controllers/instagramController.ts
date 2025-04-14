import axios from "axios";
import { Request, Response } from "express";

export const postToInstagram = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const message = `${name}\n\n${description}`;

    const pageId = "YOUR_FACEBOOK_PAGE_ID";
    const accessToken = "YOUR_LONG_LIVED_PAGE_ACCESS_TOKEN";
    const instagramAccountId = "YOUR_INSTAGRAM_ACCOUNT_ID";

    // Step 1: Create a container with caption and image URL (or just caption)
    const mediaRes = await axios.post(
      `https://graph.facebook.com/v19.0/${instagramAccountId}/media`,
      {
        image_url: "https://example.com/event-image.jpg", // replace with your actual image URL
        caption: message,
        access_token: accessToken,
      }
    );

    const creationId = mediaRes.data.id;

    // Step 2: Publish the media
    await axios.post(
      `https://graph.facebook.com/v19.0/${instagramAccountId}/media_publish`,
      {
        creation_id: creationId,
        access_token: accessToken,
      }
    );

    res.status(200).json({ message: "Posted to Instagram successfully" });
  } catch (err) {
    console.error("Error posting to Instagram", err);
    res.status(500).json({ error: "Instagram post failed" });
  }
};
