import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  fullName: String,
  email: String,
});

export const UserModel = mongoose.model('Users', UserSchema);
