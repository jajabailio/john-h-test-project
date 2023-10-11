import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  userId: [String],
});

export const CompanyModel = mongoose.model('Companies', CompanySchema);
