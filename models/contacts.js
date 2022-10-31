let contacts = require('./contacts.json');
const { nanoid } = require('nanoid');

const listContacts = (_, res) => {
  return res.status(200).json(contacts);
};

const getById = (req, res) => {
  const { contactId } = req.params;
  const findContactId = contacts.find(({ id }) => id === contactId);
  if (!findContactId) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json(findContactId);
};

const removeContact = (req, res) => {
  const { contactId } = req.params;
  const findContact = contacts.find(({ id }) => id === contactId);
  if (!findContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  const newContacts = contacts.filter(contact => contact.id !== contactId);
  contacts = newContacts;
  return res.status(200).json({ message: 'contact deleted' });
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const findContactName = contacts.find(el => el.name === name);
  if (!findContactName) {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    return res.status(201).json(newContact);
  }
  return res
    .status(200)
    .json({ message: 'There is already a contact with this name' });
};

const updateContact = (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const findContact = contacts.find(({ id }) => id === contactId);
  if (!findContact) {
    return res.status(404).json({ message: 'Not Found' });
  }
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  contacts.forEach(contact => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });
  return res.status(200).json(findContact);
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
