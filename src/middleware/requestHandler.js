const { validationResult } = require('express-validator');
const RequestValidationError = require('../util/requestValidationError');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(new RequestValidationError(errors.array()));
  next();
};
module.exports = validateRequest;
