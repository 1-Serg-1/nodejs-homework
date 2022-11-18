const express = require('express');
const { tryCatchWrapper } = require('../../helpers/tryCatchWrapper');
const { checkToken } = require('../../middlewares/checkTokenMiddleware');
const { listContactsPrivat } = require('../../models/contactsPrivat');

const routerPrivat = express.Router();

routerPrivat.get(
  '/current',
  tryCatchWrapper(checkToken),
  tryCatchWrapper(listContactsPrivat)
);

module.exports = routerPrivat;
