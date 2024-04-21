import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContactController,
} from "../controllers/contactsControllers.js";
import { checkUserId, checkUserIdStatus } from "../middlewares/idIsValid.js";
import { protect } from "../middlewares/authMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/",protect, getAllContacts);

contactsRouter.get("/:id", checkUserId, protect, getOneContact);

contactsRouter.delete("/:id", checkUserId, protect, deleteContact);

contactsRouter.post("/",protect, createContact);

contactsRouter.put("/:id", checkUserId, protect, updateContact);

contactsRouter.patch(
  "/:contactId/:favorite",
    checkUserIdStatus,
    protect,
  updateStatusContactController
);

export default contactsRouter;
