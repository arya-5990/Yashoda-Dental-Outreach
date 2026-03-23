import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  method: { type: String, enum: ['phone', 'email'], required: true },
  contact: { type: String, required: true, unique: true }, // phone number or email string
  password: { type: String, required: true },
  name: { type: String, default: 'Intern' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
