const app = require('./app');
const { PORT, SERVICE_NAME } = require('./config/env');

app.listen(PORT, () => {
  console.log(`[SERVER] ${SERVICE_NAME} started on port ${PORT}`);
  console.log(`[SERVER] Health check available at http://localhost:${PORT}/api/health`);
});
