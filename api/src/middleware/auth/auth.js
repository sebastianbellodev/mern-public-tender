import basicAuth from 'basic-auth';

import status from '../../json/status.js';
import error from '../../json/error.js';

export const checkBasicAuth = (req, res, callback) => {
  const auth = basicAuth(req);

  if (!auth || !checkCredentials(auth)) {
    res.set('WWW-Authenticate', 'Basic realm="Secure"');
    return res.status(status.UNAUTHORIZED).json(error.UNAUTHORIZED);
  }

  callback();
};

function checkCredentials(auth) {
  return (
    auth.name === process.env.BASIC_AUTH_USER &&
    auth.pass === process.env.BASIC_AUTH_PASSWORD
  );
}
