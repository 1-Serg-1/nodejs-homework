const { createUnauthorized } = require('../helpers/createHttpError');
const { User } = require('./userSchema');

const updateUserAvatarUrl = async (req, res, next) => {
  const { email, _id } = req.user;
  const { newPath } = req.file;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createUnauthorized());
  }
  await User.findByIdAndUpdate(
    _id,
    {
      avatarURL: newPath,
    },
    { new: true }
  );
  return res.status(200).json({ avatarURL: req.user.avatarURL });
};

module.exports = {
  updateUserAvatarUrl,
};
