import Hiring from '../models/hiring-model.js';
import status from '../json/status.js';
import error from '../json/error.js';

export const getHiring = async (req, res) => {
  try {
    const hirings = await Hiring.find().where({ deleted: false });

    if (hirings.length === 0) {
      return res.status(status.NOT_FOUND).json({ error: 'Hirings not found' });
    }

    res.status(status.OK).json(hirings);
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

export const getHiringById = async (req, res) => {
  try {
    const hiring = await Hiring.findById(req.params.id).where({
      deleted: false,
    });

    if (!hiring) {
      return res.status(status.NOT_FOUND).json({ error: 'Hiring not found' });
    }

    res.status(status.OK).json(file);
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

export const deleteHiring = async (req, res) => {
  try {
    const hiring = await Hiring.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
      },
      { new: true }
    ).where({ deleted: false });

    if (!hiring) {
      return res.status(status.NOT_FOUND).json({ error: 'Hiring not found' });
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

export const putHiring = async (req, res) => {
  try {
    const hiring = await Hiring.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).where({ deleted: false });

    if (!hiring) {
      return res.status(status.NOT_FOUND).json({ error: 'Hiring not found' });
    }

    res.status(status.OK).json(file);
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

export const postHiring = async (req, res) => {
  try {
    const document = new Hiring(req.body);
    const hiring = await document.save();

    res.status(status.CREATED).json(hiring);
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
