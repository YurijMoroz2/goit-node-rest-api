import Joi from "joi";

export const registerSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    password: Joi.string().required().min(7).messages({
      "string.min": "The password must contain at least 7 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address (must contain @)",
    }),
    
  });

  export const loginSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
        email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address (must contain @)",
    }),
    password: Joi.string().required().min(7).messages({
      "string.min": "The password must contain at least 7 characters",
    }),
  });
