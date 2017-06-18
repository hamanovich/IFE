import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import slug from 'slug';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    trim: true,
    required: 'Question field is required'
  },
  slug: String,
  skill: {
    type: [String],
    required: 'Skill field is required'
  },
  level: {
    type: [String],
    required: 'Level field is required'
  },
  theory: {
    type: String,
    required: 'Theory field is required'
  },
  answer: {
    type: String,
    trim: true,
    required: 'Answers field is required'
  },
  answers: [Schema.Types.Mixed],
  notes: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: 'You must supply an author',
    autopopulate: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  created: {
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
}, {
  toJSON: { virtuals: true },
  toOjbect: { virtuals: true }
});

questionSchema.index({
  question: 'text',
  answer: 'text'
});

questionSchema.pre('save', function preHook(next) {
  if (!this.isModified('question')) {
    next();
    return;
  }

  this.slug = slug(this.question);
  next();
});

questionSchema.plugin(autopopulate);

export default mongoose.model('question', questionSchema);
