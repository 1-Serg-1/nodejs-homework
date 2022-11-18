const express = require('express');
const { tryCatchWrapper } = require('../../helpers/tryCatchWrapper');
const { checkToken } = require('../../middlewares/checkTokenMiddleware');
const { authValidation } = require('../../middlewares/validationMiddleware');
const { signup, login, logout } = require('../../models/auth');

const authRouter = express.Router();

authRouter.post('/signup', authValidation, tryCatchWrapper(signup));
authRouter.post('/login', tryCatchWrapper(login));
authRouter.post(
  '/logout',
  tryCatchWrapper(checkToken),
  tryCatchWrapper(logout)
);

module.exports = authRouter;
