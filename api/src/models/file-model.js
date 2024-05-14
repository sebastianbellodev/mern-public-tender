import moongose from 'mongoose';

const FILE_SCHEMA = new moongose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  reference: {
    type: String,
    required: true,
    trim: true,
  },
  operator: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'users',
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
  hiringProcessCategory: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'hiring-process-categories',
  },
  assessmentMetric: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'assessment-metrics',
  },
  advancePayment: {
    type: Boolean,
  },
  porcentage: {
    type: String,
    trim: true,
  },
  internationalPolicies: [
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
