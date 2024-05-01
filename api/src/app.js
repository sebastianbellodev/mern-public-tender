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
import assessmentCriteriaRouter from './v1/routes/assessment.criteria.routes.js';
import authRouter from './v1/routes/auth.routes.js';
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
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(API, companyRouter);
app.use(API, addressRouter);
app.use(API, authRouter);
app.use(API, fileRouter);
app.use(API, hiringRouter);
app.use(API, lawRouter);
app.use(API, internationalPolicyRouter);
app.use(API, assessmentCriteriaRouter);
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
