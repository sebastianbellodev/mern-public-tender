import moongose from 'mongoose';

const ASSESSMENT_CRITERIA_SCHEMA = new moongose.Schema({
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
  'assessment-criterias',
  ASSESSMENT_CRITERIA_SCHEMA
);
