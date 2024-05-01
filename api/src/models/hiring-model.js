import moongose from 'mongoose';

const HIRING_SCHEMA = new moongose.Schema({
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

export default moongose.model('hirings', HIRING_SCHEMA);
