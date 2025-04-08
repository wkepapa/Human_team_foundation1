import mongoose, { Schema, Document } from 'mongoose';

// 
// const volunteerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   skills: { type: String, required: true }
// }, { timestamps: true });

// const Volunteer = mongoose.model('Volunteer', volunteerSchema);
// export default Volunteer;



export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  accepted: boolean;
}

const volunteerSchema: Schema<IVolunteer> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: { type: [String], default: [] },
  accepted: { type: Boolean, default: false }
}, { timestamps: true });

const Volunteer = mongoose.model<IVolunteer>('Volunteer', volunteerSchema);
export default Volunteer;
