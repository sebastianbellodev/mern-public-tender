import Company from '../models/company-model.js';
import status from '../json/status.js';
import error from '../json/error.js';

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find()
      .where({ deleted: false })
      .populate('address');

    if (companies.length === 0) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Companies not found' });
    }

    res.status(status.OK).json(companies);
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

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .where({ deleted: false })
      .populate('address');

    if (!company) {
      return res.status(status.NOT_FOUND).json({ error: 'Company not found' });
    }

    res.status(status.OK).json(company);
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

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
      },
      { new: true }
    ).where({ deleted: false });

    if (!company) {
      return res.status(status.NOT_FOUND).json({ error: 'Company not found' });
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

export const putCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).where({ deleted: false });

    if (!company) {
      return res.status(status.NOT_FOUND).json({ error: 'Company not found' });
    }

    res.status(status.OK).json(company);
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

export const postCompany = async (req, res) => {
  try {
    const document = new Company(req.body);
    const company = await document.save();

    res.status(status.CREATED).json(company);
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
