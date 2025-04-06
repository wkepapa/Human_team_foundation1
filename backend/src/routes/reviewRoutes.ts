import express from "express";
import { createReview, getReviews } from "../controllers/reviewController";

const router = express.Router();

router.post("/", createReview);
router.get("/", getReviews);

export default router;
