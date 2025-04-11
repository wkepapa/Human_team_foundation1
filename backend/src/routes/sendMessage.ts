// routes/sendMessage.ts (or however you organize routes)

import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const router = express.Router();
const upload = multer({ dest: "uploads/" }); // for handling multipart/form-data

router.post("/send-message", upload.single("image"), async (req, res) => {
  console.log("Entered");
  const { subject, body, email } = req.body;
  const image = req.file;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions: any = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: `<p>${body}</p>`,
    };

    if (image) {
      const fileContent = fs.readFileSync(image.path);
      mailOptions.attachments = [
        {
          filename: image.originalname,
          content: fileContent,
        },
      ];
    }

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
