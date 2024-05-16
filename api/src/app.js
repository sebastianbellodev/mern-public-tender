import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import companyRouter from './v1/routes/company.routes.js';
import addressRouter from './v1/routes/address.routes.js';
import fileRouter from './v1/routes/file.routes.js';
import hiringRouter from './v1/routes/hiring.routes.js';
import hiringProcessCategoryRouter from './v1/routes/hiring.process.category.routes.js';
import internationalPolicyRouter from './v1/routes/international.policy.routes.js';
import lawRouter from './v1/routes/law.routes.js';
import assessmentMetricRouter from './v1/routes/assessment.metric.routes.js';
import authRouter from './v1/routes/auth.routes.js';
import swaggerRouter from './v1/swagger.js';
import status from './json/status.js';

const app = express();
const API = '/api/v1';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
const DEV_CLIENT = 'http://localhost:5173';
const PROD_CLIENT = process.env.CLIENT_URL;
app.use(
  cors({
    origin: process.env.NODE_ENV === 'development' ? DEV_CLIENT : PROD_CLIENT,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(API, companyRouter);
app.use(API, addressRouter);
app.use(API, authRouter);
app.use(API, fileRouter);
app.use(API, hiringRouter);
app.use(API, lawRouter);
app.use(API, internationalPolicyRouter);
app.use(API, assessmentMetricRouter);
app.use(API, hiringProcessCategoryRouter);
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
