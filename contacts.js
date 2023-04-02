import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

let contactsPath = path.join("./db", "contacts.json");

export function listContacts() {
  fs.readFile(contactsPath, { ecncoding: "utf-8" })
    .then((contacts) => {
      console.table(JSON.parse(contacts));
    })
    .catch((error) => console.error(error));
}

export function getContactById(contactId) {
  fs.readFile(contactsPath, { ecncoding: "utf-8" })
    .then((contacts) => {
      const searchingContact = JSON.parse(contacts).find(
        (contact) => contact.id === contactId
      );
      if (!searchingContact) return console.log("no contact found");
      console.log(searchingContact);
    })
    .catch((err) => console.log(err.message));
}

export function removeContact(contactId) {
  fs.readFile(contactsPath, { ecncoding: "utf-8" }).then((contacts) => {
    const findContact = JSON.parse(contacts).find(
      (contact) => contact.id === contactId
    );
    if (!findContact) return console.log("no contact found");
    fs.writeFile(
      contactsPath,
      JSON.stringify(
        JSON.parse(contacts).filter((contact) => contact.id != contactId)
      )
    );
  });
}

export function addContact(name, email, phone) {
  fs.readFile(contactsPath, { ecncoding: "utf-8" }).then((contacts) => {
    fs.writeFile(
      contactsPath,
      JSON.stringify([
        ...JSON.parse(contacts),
        {
          id: nanoid(),
          name,
          email,
          phone,
        },
      ])
    );
  });
}
