import moongose from 'mongoose';

const AUTH_SCHEMA = new moongose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export default moongose.model('users', AUTH_SCHEMA);
