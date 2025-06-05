const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))  // <-- moved this up into chain
  .get('/', (req, res) => {
    res.send('Welcome to the API!');
  });

const db = require('./models');

db.mongoose
  .connect(db.url)
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
