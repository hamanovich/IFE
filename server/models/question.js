import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question field is required']
  },
  skill: {
    type: [String],
    required: [true, 'Skill field is required']
  },
  level: {
    type: [String],
    required: [true, 'Level field is required']
  },
  theory: {
    type: String,
    required: [true, 'Theory field is required']
  },
  answer: {
    type: String,
    required: [true, 'Answers field is required']
  },
  answers: [Schema.Types.Mixed],
  notes: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  votes: {
    like: [Schema.Types.ObjectId],
    dislike: [Schema.Types.ObjectId]
  }
});

questionSchema.plugin(autopopulate);

export default mongoose.model('question', questionSchema);
