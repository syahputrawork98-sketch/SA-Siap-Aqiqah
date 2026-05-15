const { SERVICE_NAME, NODE_ENV } = require('../config/env');

const getHealthStatus = () => {
  return {
    status: 'ok',
    service: SERVICE_NAME,
    mode: NODE_ENV,
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  getHealthStatus,
};
