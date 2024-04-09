import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContactController,
} from "../controllers/contactsControllers.js";
import { checkUserId, checkUserIdStatus } from "../midlewares/idIsValid.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkUserId, getOneContact);

contactsRouter.delete("/:id", checkUserId, deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", checkUserId, updateContact);

contactsRouter.patch(
  "/:contactId/:favorite",
  checkUserIdStatus,
  updateStatusContactController
);

export default contactsRouter;
