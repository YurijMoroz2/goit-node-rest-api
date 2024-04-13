import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";

import { UserAuth } from "../modals/userModelAuth.js";
import { registerSchema } from "../schemas/userSchemas.js";

export async function addContactAuth({ password, email, subscription }) {
    try {
      const newContact = await UserAuth.create({ password, email, subscription });
  
      return newContact;
    
    } catch (error) {
      console.error(error);
    }
  }
  export const createContactAuth = async (req, res, next) => {
    try {
        // console.log(req.body);
      const validate = validateBody(registerSchema)(req, res, next);
    //   console.log(validate);
      const newContact = await addContactAuth(validate);
    
    //   const newContact = await addContactAuth(req.body);
  
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  };