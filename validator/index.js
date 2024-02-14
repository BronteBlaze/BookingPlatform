const Joi = require("joi");

exports.signupValidation = Joi.object({
  firstName: Joi.string().max(32).required(),
  lastName: Joi.string().max(32).required(),
  phoneNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
  userName: Joi.string().max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.signinValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
