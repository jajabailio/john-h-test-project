import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  owner: { id: String, fullName: String, email: String },
});

export const CompanyModel = mongoose.model('Companies', CompanySchema);
