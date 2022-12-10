const {
  createNotFoundHttpError,
  createBadRequest,
} = require('../helpers/createHttpError');
const { User } = require('./userSchema');
const nodemailer = require('nodemailer');

const { HOST_LOCAL, PORT, API_NODEMAILER_USER, API_NODEMAILER_PASS } =
  process.env;

const sendEmail = async ({ email, verificationToken }) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: API_NODEMAILER_USER,
      pass: API_NODEMAILER_PASS,
    },
  });

  const url = `${HOST_LOCAL + PORT}/api/users/verify/${verificationToken}`;
  const emailBody = {
    from: 'phonebook@test.com',
    to: email,
    subject: 'Please verify your email',
    html: `<h1>
        Please open this <a href="${url}">link</a>
      </h1>`,
    text: 'Hello, please verify your email',
  };
  await transport.sendMail(emailBody);
};

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return next(createNotFoundHttpError('User not found'));
  }
  if (!user.verify) {
    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });
    return res.status(200).json({ message: 'Verification successful' });
  }
  if (user.verify) {
    return res.status(200).json({ message: 'Your Email already verified' });
  }
};

const reSendEmailVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createBadRequest('missing required field email'));
  }
  if (!user.verify) {
    sendEmail({ email, verificationToken: user.verificationToken });
    return res.status(200).json({ message: 'Verification email sent' });
  }
  if (user.verify) {
    return next(createBadRequest('Verification has already been passed'));
  }
};

module.exports = {
  verifyEmail,
  sendEmail,
  reSendEmailVerify,
};
