const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

function listContacts() {
  try {
    const data = fs.readFileSync(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error(error.message);
  }
}

function getContactById(contactId) {
  try {
    const data = fs.readFileSync(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      console.table([contact]);
    } else {
      console.log(`Contact with id=${contactId} not found`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

function removeContact(contactId) {
  try {
    const data = fs.readFileSync(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    contacts = contacts.filter((c) => c.id !== contactId);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
    console.log(`Contact with id=${contactId} removed`);
  } catch (error) {
    console.error(error.message);
  }
}

function addContact(name, email, phone) {
  try {
    const data = fs.readFileSync(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      name,
      email,
      phone,
      id: Math.random().toString(36).substr(2, 9),
    };
    contacts.push(newContact);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
    console.log("Contact added");
    console.table(contacts);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
