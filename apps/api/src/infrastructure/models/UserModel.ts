import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
});

export const UserModel = mongoose.model('Users', UserSchema);