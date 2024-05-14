import File from '../models/file-model.js';
import status from '../json/status.js';
import error from '../json/error.js';

export const getFile = async (req, res) => {
  try {
    const files = await File.find()
      .where({ deleted: false })
      .populate([
        { path: 'operator' },
        { path: 'hiring' },
        { path: 'law' },
        { path: 'assessmentMetric' },
        { path: 'hiringProcessCategory' },
        { path: 'internationalPolicies' },
      ]);

    if (files.length === 0) {
      return res.status(status.NOT_FOUND).json({ error: 'Files not found' });
    }

    res.status(status.OK).json(files);
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

export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id)
      .where({ deleted: false })
      .populate([
        { path: 'operator' },
        { path: 'hiring' },
        { path: 'law' },
        { path: 'assessmentMetric' },
        { path: 'hiringProcessCategory' },
        { path: 'internationalPolicies' },
      ]);

    if (!file) {
      return res.status(status.NOT_FOUND).json({ error: 'File not found' });
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

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
      },
      { new: true }
    ).where({ deleted: false });

    if (!file) {
      return res.status(status.NOT_FOUND).json({ error: 'File not found' });
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

export const putFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).where({ deleted: false });

    if (!file) {
      return res.status(status.NOT_FOUND).json({ error: 'File not found' });
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

export const postFile = async (req, res) => {
  try {
    const document = new File(req.body);
    const file = await document.save();

    res.status(status.CREATED).json(file);
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
