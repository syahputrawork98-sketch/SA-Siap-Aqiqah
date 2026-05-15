const { NODE_ENV } = require('../config/env');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    stack: NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
