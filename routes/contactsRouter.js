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

contactsRouter.get("/:id",protect, checkUserId, getOneContact);

contactsRouter.delete("/:id",protect, checkUserId, deleteContact);

contactsRouter.post("/",protect, createContact);

contactsRouter.put("/:id",protect, checkUserId, updateContact);

contactsRouter.patch(
  "/:contactId/:favorite",
  protect,
  checkUserIdStatus,
  updateStatusContactController
);

export default contactsRouter;
