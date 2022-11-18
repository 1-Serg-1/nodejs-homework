const {
  createCheckToken,
  createNotFoundHttpError,
} = require('../helpers/createHttpError');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userSchema');

const { JWT_SECRET } = process.env;

async function checkToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [tokenType, token] = authHeader.split(' ');
  if (tokenType === 'Bearer' && token) {
    try {
      const verifiedToken = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(verifiedToken._id);
      if (!user) {
        return next(createNotFoundHttpError());
      }
      if (!user.token) {
        return next(createCheckToken());
      }
      req.user = user;
      return next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return next(createCheckToken());
      }
      if (error.name === 'JsonWebTokenError') {
        return next(createCheckToken());
      }
      throw error;
    }
  }
  return next(createCheckToken());
}

module.exports = {
  checkToken,
};
