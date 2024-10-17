import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { Contact, sequelize } from "./models/index.js";
import { formatContactsList } from "./utils.js";


const rl = readline.createInterface({ input, output });

console.log("--- ContactList ---");

async function creatNewContact() {
  const firstName = await rl.question("FirstName: ");
  const lastName = await rl.question("LastName: ");
  const mobilePhone = await rl.question("Phone(mobile): ");
  const isFavorite = await rl.question("Is Favorite (Default: No): ");

  await Contact.create({
    firstName,
    lastName,
    mobilePhone,
    isFavorite: ['Yes', 'yes', 'YES'].includes(isFavorite),
  });
}

async function deleteContact() {
  await showContactsList();

  const id = await rl.question("ID: ");

  await Contact.destroy({
    where: { id },
  });
}

async function showContactsList() {
  const contacts = await Contact.findAll();
  const formattedContactsList = formatContactsList(contacts);

  console.log("Contacts List: ");
  console.log(formattedContactsList);
}

function quit() {
  rl.close();
}

async function help() {
  console.log(
    "n: add new contact\nd: delete contact\nl: show contacts list\nq: quit"
  );
  console.log("------------");
  const action = await rl.question("Enter your input: ");

  if (action == "n") {
    await creatNewContact();
  } else if (action == "d") {
    await deleteContact();
  } else if (action == "l") {
    await showContactsList();
  } else {
    quit();
    return;
  }

  console.log("------------");
  help();
}

async function main() {
  console.log("------------");

  try {
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");

    help();
  } catch (error) {
    console.log("Error in syncing models:", error);
  }
}

await main();
