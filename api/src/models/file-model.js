import moongose from 'mongoose';

const FILE_SCHEMA = new moongose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  budgetaryYear: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  addendum: {
    type: String,
    trim: true,
  },
  hiring: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'hirings',
  },
  law: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'laws',
  },
  assessment: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'assessment-criterias',
  },
  advancePayment: {
    type: Boolean,
  },
  porcentage: {
    type: String,
    trim: true,
  },
  hiringProcessCategory: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'hiring-process-categories',
  },
  internationalPolicy: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: 'international-policies',
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
});

export default moongose.model('files', FILE_SCHEMA);
