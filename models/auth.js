const {
  createDuplicateKey,
  createBadRequest,
  createUnauthorized,
} = require('../helpers/createHttpError');
const { User } = require('./userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { sendEmail } = require('./verifyUser');

const { JWT_SECRET } = process.env;

async function signup(req, res, next) {
  const { email, password } = req.body;
  const verificationToken = nanoid();
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const urlAvatarUser = gravatar.url(email);
  const user = new User({
    email,
    password: hashedPassword,
    verificationToken,
    avatarURL: urlAvatarUser,
  });

  try {
    await user.save();
    await sendEmail({ email, verificationToken });
    return res.status(201).json({
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    if (error.message.includes('E11000')) {
      next(createDuplicateKey());
    }
    next(createBadRequest(error.message));
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createUnauthorized());
  }
  if (!user.verify) {
    return next(createUnauthorized('Email is not verified'));
  }
  try {
    const isPasswordTheSame = await bcrypt.compare(password, user.password);
    if (!isPasswordTheSame) {
      return next(createUnauthorized());
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '15m' });

    user.token = token;
    await User.findByIdAndUpdate(user._id, user);

    return res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    return next(createBadRequest(error.message));
  }
}

async function logout(req, res, next) {
  const { user } = req;
  user.token = null;
  await User.findByIdAndUpdate(user._id, user);
  return res.status(204).json({});
}

module.exports = {
  signup,
  login,
  logout,
};
