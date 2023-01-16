const contactsApi = require("./contacts");
const argv = require("yargs").argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contact = await contactsApi.listContacts();
      console.log(contact);
      break;

    case "get":
      const foundContact = await contactsApi.getContactById(id);
      console.log(foundContact);
      break;

    case "add":
      const newContact = await contactsApi.addContact(name, email, phone);
      console.log("add new contact: ", newContact);
      break;

    case "remove":
      const removedContact = await contactsApi.removeContact(id);
      console.log("remove succes! remove contact: ", removedContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
