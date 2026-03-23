import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  internPhone: { type: String, required: true },
  customerPhone: { type: String, required: true },
  audioUrl: { type: String, required: true },
  screenshotUrl: { type: String, required: true },
  status: { type: String, enum: ['review', 'verified', 'issue'], default: 'review' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Sale', saleSchema);
