import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { User } from "../modals/userModel.js";

export const checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const idIsValid = Types.ObjectId.isValid(id);

    if (!idIsValid) throw HttpError(404);

    const contact = await User.findById(id);

    if (!contact) throw HttpError(404);

    req.user = contact;

    next();
  } catch (error) {
    next(error);
  }
};

export const checkUserIdStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const idIsValid = Types.ObjectId.isValid(contactId);

    if (!idIsValid) throw HttpError(404);

    const contact = await User.findById(contactId);

    if (!contact) throw HttpError(404);

    req.user = contact;

    next();
  } catch (error) {
    next(error);
  }
};
