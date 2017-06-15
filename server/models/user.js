import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username field is required']
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
    lowercase: true
  },
  password_digest: {
    type: String,
    required: [true, 'Password field is required']
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
  // resetPasswordToken: String,
  // resetPasswordExpires: Date,
  votes: {
    like: [Schema.Types.ObjectId],
    dislike: [Schema.Types.ObjectId]
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'question',
    autopopulate: { select: 'questions' }
  }],
  lists: Schema.Types.Mixed,
  candidates: [{
    type: Schema.Types.ObjectId,
    ref: 'candidate',
    autopopulate: true
  }]
});

userSchema.plugin(autopopulate);

export default mongoose.model('user', userSchema);
