import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  skills: { type: String, required: true }
}, { timestamps: true });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
export default Volunteer;
