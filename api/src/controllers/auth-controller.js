import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/auth-model.js';
import status from '../json/status.js';
import error from '../json/error.js';
import { tokenize, JWT_KEY } from '../middleware/jwt/jwt.js';

export const signup = async (req, res) => {
  const { email, password, username, name, lastname } = req.body;
  try {
    const duplicate = await User.findOne({
      username,
    });

    if (duplicate)
      return res
        .status(status.BAD_REQUEST)
        .json({ error: 'Username already exists' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const document = new User({
      _id,
      username,
      email,
      password: hash,
      name,
      lastname,
    });

    const user = await document.save();
    const token = await tokenize({ id: document._id });

    res.cookie('token', token);
    return res.status(status.OK).json(user);
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

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(status.UNAUTHORIZED)
        .json({ error: 'Invalid username or password' });

    const authenticated = await bcrypt.compare(password, user.password);

    if (!authenticated)
      return res
        .status(status.UNAUTHORIZED)
        .json({ error: 'Invalid username or password' });

    const token = await tokenize({ id: user._id });

    res.cookie('token', token);
    return res.status(status.OK).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    });
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

export const logout = (req, res) => {
  try {
    res.cookie('token', '', { expires: new Date(0) });
    return res.sendStatus(status.NO_CONTENT);
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

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) return res.status(status.UNAUTHORIZED).json(error.UNAUTHORIZED);

    jwt.verify(token, JWT_KEY, async (err, user) => {
      if (err) return res.status(status.UNAUTHORIZED).json(error.UNAUTHORIZED);

      const document = await User.findById(user.id);

      if (!document)
        return res.status(status.UNAUTHORIZED).json(error.UNAUTHORIZED);

      return res
        .status(status.OK)
        .json({
          _id: document._id,
          username: document.username,
          email: document.email,
          name: document.name,
          lastname: document.lastname,
        });
    });
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
