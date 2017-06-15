import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  first_name: {
    type: String,
    required: [true, 'First name field is required']
  },
  last_name: {
    type: String,
    required: [true, 'Last name field is required']
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
    lowercase: true
  },
  primary_skill: String,
  job_function: String,
  notes: {
    type: String,
    default: 'Please add some notes about candidate'
  },
  expert: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    autopopulate: true
  }],
  result: {
    type: String,
    enum: ['Recommended', 'Recommended with issues', 'Not Recommended']
  },
  result_notes: String
});

candidateSchema.plugin(autopopulate);

export default mongoose.model('candidate', candidateSchema);
