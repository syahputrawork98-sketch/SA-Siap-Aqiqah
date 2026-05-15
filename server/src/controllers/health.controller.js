const healthService = require('../services/health.service');

const getHealth = (req, res) => {
  const healthData = healthService.getHealthStatus();
  res.json(healthData);
};

module.exports = {
  getHealth,
};
