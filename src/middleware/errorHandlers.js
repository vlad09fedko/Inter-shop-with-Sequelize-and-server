
import { ValidationError as YupValidationError } from 'yup';
import {
  ValidationError as SequelizeValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  ConnectionError,
  DatabaseError,
} from 'sequelize';

const sequelizeErrors = [
  { type: UniqueConstraintError, status: 409, title: 'Conflict' },
  { type: ForeignKeyConstraintError, status: 400, title: 'Foreign key constraint error' },
  { type: SequelizeValidationError, status: 400, title: 'Validation error' },
  { type: ConnectionError, status: 503, title: 'Database connection error' },
  { type: DatabaseError, status: 500, title: 'Database error' },
];

export const validationErrorHandler = (error, req, res, next) => {
  if (error instanceof YupValidationError) {
    return res.status(400).send({
      errors: [{ title: 'Validation error', details: error.errors }],
    });
  }

  next(error);
};

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);

  const matchedError = sequelizeErrors.find(
    ({ type }) => error instanceof type
  );

  if (matchedError) {
    const { status, title } = matchedError;

    return res.status(status).send({
      errors: [{
        title,
        ...(error.errors && {
          details: error.errors.map((item) => item.message),
        }),
      }],
    });
  }

  console.error(error);

  return res.status(error?.status ?? 500).send({
    errors: [{
      title: error?.message ?? 'Internal server error',
    }],
  });
};
