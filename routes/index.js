const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the API root!');
});

router.use('/swagger', require('./swagger'));
router.use('/user', require('./user'));
router.use('/theme', require('./theme'));

module.exports = router;
