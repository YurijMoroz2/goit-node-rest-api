import Joi from "joi";

export const registerSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    password: Joi.string().min(2).max(30).required().messages({
      "string.base": "Enter a valid name of at least 2 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address (must contain @)",
    }),
    // subscription: Joi.string().required().min(7).messages({
    //   "string.min": "The phone number must contain at least 7 characters",
    // }),
    // token:
  });

  export const loginSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
        email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address (must contain @)",
    }),
    password: Joi.string().required().min(7).messages({
      "string.min": "The phone number must contain at least 7 characters",
    }),
  });
