import jwt from 'jsonwebtoken';

import status from '../../json/status.js';
import error from '../../json/error.js';

export const JWT_KEY = process.env.JWT_KEY;

export const tokenize = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_KEY, { expiresIn: '2h' }, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
};

export const checkToken = (req, res, callback) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(status.FORBIDDEN).json(error.FORBIDDEN);
  }

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(status.FORBIDDEN).json(error.FORBIDDEN);
    }

    req.user = decoded;
    callback();
  });
};
