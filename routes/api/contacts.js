const express = require('express');
const { tryCatchWrapper } = require('../../helpers/tryCatchWrapper');
const { contactValidation } = require('../../middlewares/validationMiddleware');
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', tryCatchWrapper(listContacts));

router.get('/:contactId', tryCatchWrapper(getById));

router.post('/', contactValidation, tryCatchWrapper(addContact));

router.delete('/:contactId', tryCatchWrapper(removeContact));

router.put('/:contactId', contactValidation, tryCatchWrapper(updateContact));

router.patch('/:contactId/favorite', tryCatchWrapper(updateStatusContact));

module.exports = router;
