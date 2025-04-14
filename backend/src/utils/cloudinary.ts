import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_NAME!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

const uploadOnCloudinary = async (
  localFilePath: string
): Promise<CloudinaryUploadResult | null> => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary. URL: " + response.url);
    fs.unlinkSync(localFilePath); // delete local file
    return response;
  } catch (error) {
    console.error("Upload failed:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // clean up
    }
    return null;
  }
};

const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Delete failed:", error);
    return false;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
