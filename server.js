const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./models');

// Middleware
app
  .use(express.json()) // replaces body-parser.json()
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

  app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });

// Connect to DB and start server
db.mongoose
  .connect(db.url) 
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ DB Connected and server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Cannot connect to the database:', err);
    process.exit(1);
  });
