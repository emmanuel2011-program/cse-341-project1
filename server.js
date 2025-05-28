const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Handles CORS properly
app.use(express.json()); // Built-in body parser for JSON

// Routes
app.use('/', require('./routes'));

// Connect to DB and start server
mongodb.initdb((err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected. Server running on port ${port}`);
    });
  }
});
