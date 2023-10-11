import mongoose from 'mongoose';

const User = {
  userId: String,
  fullName: String,
  email: String,
};

const CompanySchema = new mongoose.Schema({
  id: String,
  name: String,
  address: String,
  userId: [String],
});

export const CompanyModel = mongoose.model('Companies', CompanySchema);
