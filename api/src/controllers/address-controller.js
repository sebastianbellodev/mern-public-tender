import Address from '../models/address-model.js';
import status from '../json/status.js';
import error from '../json/error.js';

export const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ deleted: false });

    if (addresses.length === 0) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: 'Addresses not found' });
    }

    res.status(status.OK).json(addresses);
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

export const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id).where({
      deleted: false,
    });

    if (!address) {
      return res.status(status.NOT_FOUND).json({ error: 'Address not found' });
    }

    res.status(status.OK).json(address);
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

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
      },
      { new: true }
    );

    if (!address) {
      return res.status(status.NOT_FOUND).json({ error: 'Address not found' });
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

export const putAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).where({ deleted: false });

    if (!address) {
      return res.status(status.NOT_FOUND).json({ error: 'Address not found' });
    }

    res.status(status.OK).json(address);
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

export const postAddress = async (req, res) => {
  try {
    const document = new Address(req.body);
    const address = await document.save();

    res.status(status.CREATED).json(address);
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
