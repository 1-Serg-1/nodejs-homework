const { Error } = require('mongoose');

function createNotFoundHttpError(value) {
  const err = new Error(value || 'Not found');
  err.status = 404;
  return err;
}

function createDuplicateKey() {
  const err = new Error('Email in use');
  err.status = 409;
  return err;
}

function createBadRequest(value) {
  const err = new Error(`${value}`);
  err.status = 400;
  return err;
}

function createUnauthorized(value) {
  const err = new Error(value || 'Email or password is wrong');
  err.status = 401;
  return err;
}

function createCheckToken() {
  const err = new Error('Not authorized');
  err.status = 401;
  return err;
}

module.exports = {
  createNotFoundHttpError,
  createDuplicateKey,
  createBadRequest,
  createUnauthorized,
  createCheckToken,
};
