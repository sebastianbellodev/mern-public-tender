import status from '../../json/status.js';
import error from '../../json/error.js';

export const checkSchema = (schema) => (req, res, callback) => {
  try {
    schema.parse(req.body);
    callback();
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res.status(status.BAD_REQUEST).json({ error: err });
    }
    res.status(status.BAD_REQUEST).json({ error: error.BAD_REQUEST });
  }
};
