import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import { User } from "../models/userModel.js";
import {
  createContactSchema,
  updateContacStatustSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateStatusContact,
  update_Contact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    res.status(200).json(await listContacts(req));

    next();
  } catch (error) {
    next(error);
  }
};
// ================

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await getContactById(req, id);
   
    res.status(200).json(contact);

    next();
  } catch (error) {
    next(error);
  }
};
// =====================================
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const remove_contact = await removeContact(req, id);

    res.status(200).json(remove_contact);

    next();
  } catch (error) {
    next(error);
  }
};
// ===============================
export const createContact = async (req, res, next) => {
  try {
    const validate = validateBody(createContactSchema)(req, res, next);
    
    if (validate) {
      const newContact = await addContact(req);
      res.status(201).json(newContact);
    }
  } catch (error) {
    next(error);
  }
};
// ===================================
export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const validate = validateBody(updateContactSchema)(req, res, next);

    const newUpdateContact = await update_Contact(req, id, validate.value);

    res.status(200).json(newUpdateContact);

    next();
  } catch (error) {
    console.error(error);

    next(error);
  }
};
// ======================================
export const updateStatusContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const validate = validateBody(updateContacStatustSchema)(req, res, next);

    const newUpdateContactStatus = await updateStatusContact(
      req,
      contactId,
      validate.value
    );

    res.status(200).json(newUpdateContactStatus);
    next();
  } catch (error) {
    console.log(error);

    next(error);
  }
};
