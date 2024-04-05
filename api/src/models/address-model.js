import moongose from 'mongoose';

const ADDRESS_SCHEMA = new moongose.Schema({
  street: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  exteriorNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  interiorNumber: {
    type: String,
    trim: true,
    uppercase: true,
  },
  neighborhood: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

export default moongose.model('addresses', ADDRESS_SCHEMA);
