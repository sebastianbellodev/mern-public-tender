import HiringProcessCategory from '../models/hiring-process-category-model.js';
import status from '../json/status.js';
import error from '../json/error.js';

export const getHiringProcessCategory = async (req, res) => {
  try {
    const hiringProcessCategories = await HiringProcessCategory.find().where({
      deleted: false,
    });

    if (hiringProcessCategories.length === 0) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Hiring process categories not found' });
    }

    res.status(status.OK).json(hiringProcessCategories);
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

export const getHiringProcessCategoryById = async (req, res) => {
  try {
    const hiringProcessCategory = await HiringProcessCategory.findById(
      req.params.id
    ).where({ deleted: false });

    if (!hiringProcessCategory) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Hiring process categories not found' });
    }

    res.status(status.OK).json(hiringProcessCategory);
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

export const deleteHiringProcessCategory = async (req, res) => {
  try {
    const hiringProcessCategory = await HiringProcessCategory.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
      },
      { new: true }
    ).where({ deleted: false });

    if (!hiringProcessCategory) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Hiring process categories not found' });
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

export const putHiringProcessCategory = async (req, res) => {
  try {
    const hiringProcessCategory = await HiringProcessCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).where({ deleted: false });

    if (!hiringProcessCategory) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Hiring process category not found' });
    }

    res.status(status.OK).json(hiringProcessCategory);
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

export const postHiringProcessCategory = async (req, res) => {
  try {
    const document = new HiringProcessCategory(req.body);
    const hiringProcessCategory = await document.save();

    res.status(status.CREATED).json(hiringProcessCategory);
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
