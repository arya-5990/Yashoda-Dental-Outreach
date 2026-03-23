import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  method: { type: String, enum: ['phone', 'email'], required: true },
  contact: { type: String, required: true, unique: true }, // phone number or email string
  password: { type: String, required: true },
  name: { type: String, default: 'Intern' },
  email: { type: String },
  phone: { type: String },
  aadharId: { type: String },
  dob: { type: String },
  address: { type: String },
  college: { type: String },
  idCardUrl: { type: String },
  profileUrl: { type: String },
  termsAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
