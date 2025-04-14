import express from "express";
import { createEvent, getEvents } from "../controllers/eventController";
import { upload } from "../middleware/multer";
const router = express.Router();
router.post("/", upload.single("image"), createEvent);

router.get("/", getEvents);

export default router;
