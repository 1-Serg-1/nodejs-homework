const jimp = require('jimp');
const { nanoid } = require('nanoid');

const jimpResize = async (req, res, next) => {
  const avatar = await jimp.read(req.file.path);
  await avatar.resize(250, 250);
  const newNameAvatar =
    req.user.email.replace('.', '_') +
    '-' +
    nanoid() +
    '_' +
    req.file.originalname;
  const newPathAvatar = `./public/avatars/${newNameAvatar}`;
  await avatar.writeAsync(newPathAvatar);
  req.file.newPath = newPathAvatar;
  next();
};

module.exports = {
  jimpResize,
};
