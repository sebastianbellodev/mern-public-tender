import moongose from 'mongoose';

const INTERNATIONAL_POLICY_SCHEMA = new moongose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export default moongose.model(
  'international-policies',
  INTERNATIONAL_POLICY_SCHEMA
);
