const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/:id', contactsController.createContacts);

router.put('/:id', contactsController.updateContacts);

router.delete('/:id', contactsController.deleteContacts);




module.exports = router;


