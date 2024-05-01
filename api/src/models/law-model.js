import moongose from 'mongoose';

const LAW_SCHEMA = new moongose.Schema({
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

export default moongose.model('laws', LAW_SCHEMA);
