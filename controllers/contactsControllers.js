import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  update_Contact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    res.status(200).json(await listContacts());

    next();
  } catch (error) {
    next(error);
  }
};
// ================

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (contact) {
      res.status(200).json(contact);
    } else {
      throw HttpError(404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
// =====================================
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const remove_contact = await removeContact(id);

    if (remove_contact) {
      res.status(200).json(remove_contact);
    } else {
      throw HttpError(404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
// ===============================
export const createContact = async (req, res, next) => {
  try {
    const validate = validateBody(createContactSchema)(req, res, next); 
    const { name, email, phone } = validate.value;

    const newContact = await addContact(name, email, phone);

    res.status(201).json(newContact);
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
    const validate_Body = validate.value;

    const newUpdateContact = await update_Contact(id, validate_Body);

    if (newUpdateContact === null) {
      throw HttpError(404);
    }

    res.status(200).json(newUpdateContact);

    next();
  } catch (error) {
    console.error(error);

    next(error);
  }
};
