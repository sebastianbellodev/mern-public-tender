import Law from '../models/law-model.js';
import status from '../json/status.js';
import error from '../json/error.js';

export const getLaw = async (req, res) => {
  try {
    const laws = await Law.find().where({ deleted: false });

    if (laws.length === 0) {
      return res.status(status.NOT_FOUND).json({ error: 'Laws not found' });
    }

    res.status(status.OK).json(laws);
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

export const getLawById = async (req, res) => {
  try {
    const law = await Law.findById(req.params.id).where({ deleted: false });

    if (!law) {
      return res.status(status.NOT_FOUND).json({ error: 'Law not found' });
    }

    res.status(status.OK).json(law);
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

export const deleteLaw = async (req, res) => {
  try {
    const law = await Law.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
      },
      { new: true }
    ).where({ deleted: false });

    if (!law) {
      return res.status(status.NOT_FOUND).json({ error: 'Law not found' });
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

export const putLaw = async (req, res) => {
  try {
    const law = await Law.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).where({ deleted: false });

    if (!law) {
      return res.status(status.NOT_FOUND).json({ error: 'Law not found' });
    }

    res.status(status.OK).json(law);
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

export const postLaw = async (req, res) => {
  try {
    const document = new Law(req.body);
    const law = await document.save();

    res.status(status.CREATED).json(law);
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
