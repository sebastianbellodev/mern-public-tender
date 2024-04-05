import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import companyRouter from './v1/routes/company.routes.js';
import addressRouter from './v1/routes/address.routes.js';
import swaggerRouter from './v1/swagger.js';
import status from './json/status.js';

const app = express();
const API = '/api/v1';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());
const ORIGIN = ['http://localhost:3000', `${process.env.URL}`];
app.use(cors(
  {
    origin: ORIGIN,
    credentials: true,
  },
));

app.use(API, companyRouter);
app.use(API, addressRouter);
// Docs router
app.use(API, swaggerRouter);

app.get(API, (req, res) => {
  res.status(status.OK).json({ message: 'Welcome to the API!' });
});

app.use((req, res, callback) => {
  res.status(status.NOT_FOUND).json({
    message: 'Ups! URL not found. Please try again...',
  });
});

export default app;
