const { createNotFoundHttpError } = require('../helpers/createHttpError');
const { Contacts } = require('./contactSchema');

const listContacts = async (req, res) => {
  const contacts = await Contacts.find({ owner: req.user._id });
  return res.json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const findContact = await Contacts.findById(contactId);
  if (findContact) {
    return res.status(200).json(findContact);
  }
  next(createNotFoundHttpError());
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const findContact = await Contacts.findById(contactId);
  if (findContact) {
    await Contacts.findByIdAndDelete(contactId);
    return res.status(200).json(findContact);
  }
  next(createNotFoundHttpError());
};

const addContact = async (req, res) => {
  req.body.owner = req.user._id;
  try {
    const newContact = await Contacts.create(req.body);
    return res.status(201).json(newContact);
  } catch (err) {
    if (err.message.includes('E11000 duplicate key')) {
      return res.status(409).json('This name is already in contacts');
    }
    throw err;
  }
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  return res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  const updatedStatusContact = await Contacts.findByIdAndUpdate(
    contactId,
    {
      favorite,
    },
    { new: true }
  );
  return res.status(200).json(updatedStatusContact);
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
