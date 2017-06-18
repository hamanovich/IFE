import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import md5 from 'md5';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: 'Username field is required'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Email field is required'
  },
  password_digest: {
    type: String,
    required: 'Password field is required'
  },
  first_name: String,
  last_name: String,
  primary_skill: String,
  job_function: String,
  notes: {
    type: String,
    default: 'Please add some notes about yourself'
  },
  // role: {
  //   type: String,
  //   enum: ['Member', 'Client', 'Owner', 'Admin'],
  //   default: 'Member'
  // },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  votes: {
    like: [Schema.Types.ObjectId],
    dislike: [Schema.Types.ObjectId]
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'question',
    autopopulate: { select: 'questions' }
  }]
});

userSchema.virtual('gravatar').get(() => {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(autopopulate);

export default mongoose.model('user', userSchema);
