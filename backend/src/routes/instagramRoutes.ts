import express from "express";
import { postToInstagram } from "../controllers/instagramController";

const router = express.Router();

router.post("/post", postToInstagram);

export default router;
