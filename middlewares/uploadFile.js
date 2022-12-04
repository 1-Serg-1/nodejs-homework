const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'tmp'),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = {
  upload,
};