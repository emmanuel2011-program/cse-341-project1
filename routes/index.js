const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/contacts', require('./contacts'));


router.get('/', (req,res) =>
    //swagger tags-['hello swagger]
     {res.send('hello swagger');});

module.exports = router;