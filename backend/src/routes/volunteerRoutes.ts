import express from 'express';
import { createVolunteer } from '../controllers/volunteerController';

const router = express.Router();

router.post('/', createVolunteer);

export default router;
