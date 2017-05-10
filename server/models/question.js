import mongoose from 'mongoose';

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
    type: String,
    required: [true, 'Author field is required']
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
  }
});

export default mongoose.model('question', questionSchema);
