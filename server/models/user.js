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
    required: [true, 'Email field is required']
  },
  password_digest: {
    type: String,
    required: [true, 'Password field is required']
  },
  avatar_image: Buffer,
  primary_skill: String,
  job_function: String,
  notes: String,
  votes: {
    like: [{
      type: Schema.Types.ObjectId,
      ref: 'question',
      autopopulate: { select: 'votes' }
    }],
    dislike: [{
      type: Schema.Types.ObjectId,
      ref: 'question',
      autopopulate: { select: 'votes' }
    }]
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'question',
    autopopulate: { select: 'questions' }
  }]
});

userSchema.plugin(autopopulate);

export default mongoose.model('user', userSchema);
