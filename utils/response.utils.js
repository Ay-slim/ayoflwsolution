// Helper functions that return appropriate response objects.

const { StatusCodes } = require('http-status-codes');

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes;

/**
 * Manage error responses
 * @param {*} param packet { statusCode, message, data, status response object }
 */
function errorResponse({
  statusCode = BAD_REQUEST,
  message = '',
  data = null,
  status = 'error',
  res,
}) {
  return res.status(statusCode).send({ message, status, data });
}

/**
 * Manage non error responses
 * @param {*} param packet { statusCode, message, data, status, response object }
 */
function okResponse({
  statusCode = OK,
  message = '',
  data = undefined,
  status = 'success',
  res,
}) {
  return res.status(statusCode).send({ message, status, data });
}

/**
 * Manage errors caught from try blocks and return custom response
 * @param {*} param packet { statusCode, message, data, status, response object }
 */
function internalErrorResponse({
    statusCode = INTERNAL_SERVER_ERROR,
    message = 'Something went wrong',
    data = null,
    status = 'error',
    res,
  }) {
    return res.status(statusCode).send({ message, status, data });
  }
module.exports = { errorResponse, okResponse, internalErrorResponse };