const express = require('express');
const { tryCatchWrapper } = require('../../helpers/tryCatchWrapper');
const { checkToken } = require('../../middlewares/checkTokenMiddleware');
const { jimpResize } = require('../../middlewares/jimpResizeMiddleware');
const { upload } = require('../../middlewares/uploadFile');
const { updateUserAvatarUrl } = require('../../models/users');
const { reSendEmailVerify } = require('../../models/verifyUser');

const userRouter = express.Router();

userRouter.patch(
  '/avatars',
  tryCatchWrapper(checkToken),
  tryCatchWrapper(upload.single('avatar')),
  jimpResize,
  tryCatchWrapper(updateUserAvatarUrl)
);
userRouter.post('/verify/', tryCatchWrapper(reSendEmailVerify));

module.exports = userRouter;
