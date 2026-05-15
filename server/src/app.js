const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SA-Siap-Aqiqah API' });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
