const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    unique: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is a required'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contacts = model('contacts', contactSchema);

module.exports = {
  Contacts,
};
