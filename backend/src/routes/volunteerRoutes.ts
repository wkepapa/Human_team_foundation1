// volunteerRoutes.ts
import express from 'express';
import {
  createVolunteer,
  getAllVolunteers,
  acceptVolunteer,
} from '../controllers/volunteerController';

const router = express.Router();

router.post('/', createVolunteer); // POST /api/volunteers
router.get('/', getAllVolunteers); // GET /api/volunteers
router.patch('/:id/accept', acceptVolunteer); // PATCH /api/volunteers/:id/accept

export default router;
