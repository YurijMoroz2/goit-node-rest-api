
import { User } from "../modals/userModel.js";

export async function listContacts() {
  try {
    const contacts = await User.find();

    return contacts;
  
  } catch (err) {
    console.log(err);
  }
}
// ============================================
export async function getContactById(contactId) {
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
export async function addContact({ name, email, phone }) {
  try {
    const newContact = await User.create({ name, email, phone });

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
