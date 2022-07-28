const express = require('express')

const ctrl = require('../../controllers/contacts');

const router = express.Router()

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', ctrl.addContact);

router.delete('/:contactId', ctrl.removeContact);

router.put('/:contactId', ctrl.updateContactById);

router.patch('/:contactId/favorite', ctrl.updateStatusContact);

module.exports = router;
