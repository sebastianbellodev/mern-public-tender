import m2s from 'mongoose-to-swagger';

import Auth from '../models/auth-model.js';

export default {
  auth: m2s(Auth),
};
