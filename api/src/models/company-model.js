import moongose from 'mongoose';

const COMPANY_SCHEMA = new moongose.Schema({
  rfc: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  comercialSociety: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  taxRegime: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  address: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'addresses',
  },
});

export default moongose.model('companies', COMPANY_SCHEMA);
