const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const foundContact = JSON.parse(contacts).find(
      (contact) => Number(contact.id) === contactId
    );
    return foundContact;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parseContacts = JSON.parse(contacts);

    const foundContact = await getContactById(contactId);

    const refreshContacts = parseContacts.filter(
      (contact) => Number(contact.id) !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(refreshContacts), "utf8");
    return foundContact;
  } catch (error) {
    console.log("remove error:", error);
    return error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parseContacts = JSON.parse(contacts);

    const newID = () => {
      for (let index = 0; index < parseContacts.length; index += 1) {
        if (Number(parseContacts[index].id) !== index + 1) {
          return (index + 1).toString();
        }
      }
      return (parseContacts.length + 1).toString();
    };

    const newContact = {
      id: newID(),
      name,
      email,
      phone,
    };

    const refreshContacts = [...parseContacts, newContact].sort(
      (a, b) => Number(a.id) - Number(b.id)
    );

    await fs.writeFile(contactsPath, JSON.stringify(refreshContacts), "utf8");
    return newContact;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
