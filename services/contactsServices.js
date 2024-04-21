import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";

export async function listContacts(req) {
  try {
    const { _id: owner } = req.user;

    const contacts = await User.find({ owner });

    return contacts;
    
  } catch (err) {
    console.log(err);
  }
}
// ============================================
export async function getContactById(req, contactId) {
  try {
    const { _id: owner } = req.user;
    
    const contact = await User.findOne({ _id: contactId, owner });

    if(!contact){
  return null
}

    return contact ;

  } catch (error) {
    console.error(error);
  }
}
// ======================================
export async function removeContact(req, contactId) {
  try {
    const { _id: owner } = req.user;

    const removedContact = await User.findOneAndDelete({ _id: contactId, owner });

    if (!removedContact) return null;

    return removedContact;

  } catch (error) {
    console.error(error);
  }
}
// ============================================

export async function addContact(req) {
  try {
    const { _id: owner } = req.user;

    const newContact = await User.create({ ...req.body, owner});

    return newContact;

  } catch (error) {
    console.error(error);
  }
}
// ============================================
export async function update_Contact(req, contactId, body) {
  try {
    const { _id: owner } = req.user;

    const existingContact = await User.findOneAndUpdate({ _id: contactId, owner }, body, {
      new: true,
    });

 if(!existingContact){

  return null
 }

    return existingContact;

  } catch (error) {
    console.error(error);
    throw new Error("Error updating contact");
  }
}
// ========================================
export async function updateStatusContact(req,contactId, body) {
  try {
    const { _id: owner } = req.user;

    const { favorite } = body;

    const contactStatus = await User.findOneAndUpdate(
      { _id: contactId, owner },
      { favorite },
      { new: true }
    );
    if(!contactStatus){

      return null
     }

    return contactStatus;

  } catch (error) {
    throw new Error("Error status contact");
  }
}
