const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts.router');
const authRouter = require('./routes/api/auth.router');
const contactsRouterPrivat = require('./routes/api/contactsPrivat.router');
const userRouter = require('./routes/api/user.router');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter, contactsRouterPrivat);
app.use('/api/contacts', contactsRouter);
// app.use('/avatars', express.static('public/avatars'));
app.use('/public/avatars', express.static('public/avatars'));
app.use('/users', userRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
  process.exit(1);
});

module.exports = app;
