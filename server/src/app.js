const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (should be last)
app.use(errorMiddleware);

module.exports = app;
