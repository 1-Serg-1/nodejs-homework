const Joi = require('joi');

const authValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    password: Joi.string().min(6).max(10).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw error;
  }
  next();
};

const contactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(
        /^[A-Z][a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
      )
      .min(2)
      .max(20)
      .required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.string().alphanum().min(10).max(20).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = {
  authValidation,
  contactValidation,
};
