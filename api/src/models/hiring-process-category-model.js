import moongose from 'mongoose';

const HIRING_PROCESS_CATEGORY_SCHEMA = new moongose.Schema({
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  internationalPolicy: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: 'international-policies',
      required: true,
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
});

export default moongose.model(
  'hiring-process-categories',
  HIRING_PROCESS_CATEGORY_SCHEMA
);
