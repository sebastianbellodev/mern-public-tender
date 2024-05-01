import InternationalPolicy from '../models/international-policy-model.js';
import status from '../json/status.js';
import error from '../json/error.js';

export const getInternationalPolicy = async (req, res) => {
  try {
    const internationalPolicies = await InternationalPolicy.find().where({
      deleted: false,
    });

    if (internationalPolicies.length === 0) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'International policies not found' });
    }

    res.status(status.OK).json(internationalPolicies);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};

export const getInternationalPolicyById = async (req, res) => {
  try {
    const internationalPolicy = await InternationalPolicy.findById(
      req.params.id
    ).where({
      deleted: false,
    });

    if (!internationalPolicy) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'International policy not found' });
    }

    res.status(status.OK).json(internationalPolicy);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};

export const deleteInternationalPolicy = async (req, res) => {
  try {
    const internationalPolicy = await InternationalPolicy.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
      },
      { new: true }
    ).where({ deleted: false });

    if (!internationalPolicy) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'International policy not found' });
    }

    res.sendStatus(status.NO_CONTENT);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};

export const putInternationalPolicy = async (req, res) => {
  try {
    const internationalPolicy = await InternationalPolicy.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).where({ deleted: false });

    if (!internationalPolicy) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'International policy not found' });
    }

    res.status(status.OK).json(internationalPolicy);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};

export const postInternationalPolicy = async (req, res) => {
  try {
    const document = new InternationalPolicy(req.body);
    const internationalPolicy = await document.save();

    res.status(status.CREATED).json(internationalPolicy);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ error: error.INTERNAL_SERVER_ERROR });
  }
};
