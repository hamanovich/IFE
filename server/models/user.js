import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username field is required']
  },
  email: {
    type: String,
    required: [true, 'Email field is required']
  },
  password_digest: {
    type: String,
    required: [true, 'Password field is required']
  }
});

const User = mongoose.model('user', userSchema);

export default User;
