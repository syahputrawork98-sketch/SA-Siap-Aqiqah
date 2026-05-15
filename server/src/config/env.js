const dotenv = require('dotenv');
const path = require('path');

// Load .env from server root
dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  SERVICE_NAME: 'SA-Siap-Aqiqah Backend',
};
