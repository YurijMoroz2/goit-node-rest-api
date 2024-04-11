import Joi from "joi";

export const createContactSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.base": "Enter a valid name of at least 2 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address (must contain @)",
    }),
    phone: Joi.string().required().min(7).messages({
      "string.min": "The phone number must contain at least 7 characters",
    }),
  });

export const updateContactSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.base": "Enter a valid name of at least 2 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address (must contain @)",
    }),
    phone: Joi.string().required().min(7).messages({
      "string.min": "The phone number must contain at least 7 characters",
    }),
  });

  export const updateContacStatustSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string().min(2).max(30).messages({
      "string.base": "Enter a valid name of at least 2 characters",
    }),
    email: Joi.string().email().messages({
      "string.email": "Please enter a valid email address (must contain @)",
    }),
    phone: Joi.string().min(7).messages({
      "string.min": "The phone number must contain at least 7 characters",
    }),
    favorite: Joi.boolean().required().messages({
      "boolean.base": "The status field must be a boolean value",
  }),
  });
