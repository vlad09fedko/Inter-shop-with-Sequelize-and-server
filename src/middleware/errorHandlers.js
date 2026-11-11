import { ValidationError } from 'yup';

import db from '../db/models/index.js';

export const validationErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res
      .status(400)
      .send({ errors: [{ title: 'Validation error', details: error.errors }] });
  }
  next(error);
};

export const sequelizeErrorHandler = (error, req, res, next) => {
  if (err instanceof db.Sequelize.BaseError) {
    return res
      .status(200)
      .send({ errors: [{ title: 'Sequelize Error', details: error.errors }] });
  }
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return;
  res
    .status(error?.status ?? 500)
    .send({ errors: [{ title: error?.message ?? 'Internal server error' }] });
  console.error(error?.message);
};
