const express = require('express');
const { tryCatchWrapper } = require('../../helpers/tryCatchWrapper');
const { checkToken } = require('../../middlewares/checkTokenMiddleware');
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

router.get('/', tryCatchWrapper(checkToken), tryCatchWrapper(listContacts));

router.get(
  '/:contactId',
  tryCatchWrapper(checkToken),
  tryCatchWrapper(getById)
);

router.post(
  '/',
  tryCatchWrapper(checkToken),
  contactValidation,
  tryCatchWrapper(addContact)
);

router.delete('/:contactId',tryCatchWrapper(checkToken), tryCatchWrapper(removeContact));

router.put('/:contactId', tryCatchWrapper(checkToken), contactValidation, tryCatchWrapper(updateContact));

router.patch('/:contactId/favorite', tryCatchWrapper(checkToken), tryCatchWrapper(updateStatusContact));

module.exports = router;
