const express = require('express');
const { tryCatchWrapper } = require('../../helpers/tryCatchWrapper');
const { checkToken } = require('../../middlewares/checkTokenMiddleware');
const { authValidation } = require('../../middlewares/validationMiddleware');
const { signup, login, logout } = require('../../models/auth');
const { verifyEmail } = require('../../models/verifyUser');

const authRouter = express.Router();

authRouter.post('/users/signup', authValidation, tryCatchWrapper(signup));
authRouter.get(
  '/users/verify/:verificationToken',
  tryCatchWrapper(verifyEmail)
);
authRouter.post('/users/login', tryCatchWrapper(login));
authRouter.post(
  '/users/logout',
  tryCatchWrapper(checkToken),
  tryCatchWrapper(logout)
);

module.exports = authRouter;
