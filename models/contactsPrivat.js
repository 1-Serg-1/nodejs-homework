const { User } = require('./userSchema');

const listContactsPrivat = async (req, res) => {
  const { email, subscription } = await User.findById(req.user._id);
  return res.json({ email, subscription });
};

module.exports = {
  listContactsPrivat,
};
