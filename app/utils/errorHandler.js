/* eslint-disable no-unused-vars */
/**
 * Middleware function that handles exceptions
 * It parses the exception and handles to a user.
 * @param {Object} err error message
 * @param {Object} req request
 * @param {Object} res response
 * @param {Function} next next function
 */
export default (err, req, res, next) => {
  console.error('Request error: ', err);
  res.status(err.status || 500);

  const response = {
    error: err.name,
    message: err.message,
  };

  ['code', 'arguments', 'details'].forEach((key) => {
    if (err[key]) {
      response[key] = err[key];
    }
  });

  res.send(response);
};
/* eslint-enable no-unused-vars */

/**
 * Base class for API errors. Contains indication of HTTP status.
 */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Throwing this error results in 404 (Not Found) HTTP response code.
 */
export class NotFoundError extends ApiError {
  constructor(message) {
    super(message, 404);
  }
}

/**
 * Throwing this error results in 403 (Forbidden) HTTP response code.
 */
export class ForbiddenError extends ApiError {
  constructor(message) {
    super(message, 403);
  }
}

/**
 * Throwing this error results in 401 (Unautorized) HTTP response code.
 */
export class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message, 401);
  }
}

/**
 * Represents validation error. Throwing this error results in 400 (Bad Request) HTTP response code.
 */
export class ValidationError extends ApiError {
  constructor(message, details) {
    super(message, 400);
    this.details = details;
  }
}

/**
 * Represents unexpected error. Throwing this error results in 500 (Internal Error) HTTP response code.
 */
export class InternalError extends ApiError {
  constructor(message) {
    super(message, 500);
  }
}
