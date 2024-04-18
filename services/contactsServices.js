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
    const contact = await User.findById(contactId);

    return contact || null;

  } catch (error) {
    console.error(error);
  }
}

// ======================================
export async function removeContact(contactId) {
  try {
    const removedContact = await User.findByIdAndDelete(contactId);

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

    const newContact = await User.create({ ...req.body, owner });

    return newContact;

  } catch (error) {
    console.error(error);
  }
}
// ============================================
export async function update_Contact(contactId, body) {
  try {
    const existingContact = await User.findByIdAndUpdate(contactId, body, {
      new: true,
    });

    return existingContact;

  } catch (error) {
    console.error(error);
    throw new Error("Error updating contact");
  }
}
// ========================================
export async function updateStatusContact(contactId, body) {
  try {
    const { favorite } = body;
    const contactStatus = await User.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    return contactStatus;

  } catch (error) {
    throw new Error("Error status contact");
  }
}
