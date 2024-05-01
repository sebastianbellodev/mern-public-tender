import m2s from 'mongoose-to-swagger';

import Address from '../models/address-model.js';
import Company from '../models/company-model.js';
import Auth from '../models/auth-model.js';

export default {
  address: m2s(Address),
  company: m2s(Company),
  auth: m2s(Auth),
};
