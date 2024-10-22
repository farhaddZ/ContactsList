import multer from "multer";
import { Contact } from "../../models/index.js";
import { formatContactsList } from "../../utils.js";

const upload = multer({ storage: multer.memoryStorage() });

export async function getContacts(req, res) {
  try {
    const contacts = await Contact.findAll();

    if (req.query.format) {
      const responseData = `<pre>${formatContactsList(contacts)}</pre>`;

      res.type("html");
      res.send(responseData);
      return;
    }

    const normalizeContacts = contacts.map(
      ({ dataValues: { id, profilePicture, ...rest } }) => ({
        id,
        profilePicture: profilePicture ? `/images/profile-picture/${id}` : null,
        ...rest,
      })
    );

    res.json(normalizeContacts);
  } catch (error) {
    res.status(500).send({
      message: "something went wrong",
      error,
    });
  }
}

export async function getContactProfilePicture(req, res) {
  try {
    const { profilePicture } = await Contact.findOne({
      attribute: ["profilePicture"],
      where: { id: req.params.id },
    });

    res.type("image/png"), res.send(profilePicture);
  } catch (error) {
    res.status(500).send({
      message: "something went wrong",
      error,
    });
  }
}

export async function createContactCtl(req, res) {
  const { firstName, lastName, mobilePhone, isFavorite } = req.body;
  const { buffer: profilePicture } = req.file || {};

  try {
    const { id } = await Contact.create({
      firstName,
      lastName,
      mobilePhone,
      isFavorite,
      profilePicture,
    });

    res.send(`The contact "#${id} ${firstName} ${lastName}" has been created`);
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong",
      error,
    });
  }
}

export const createContact = [
  upload.single("profilePicture"),
  createContactCtl,
];

export async function deleteContact(req, res) {
  try {
    await Contact.destroy({
      where: { id: req.params.id },
    });

    res.send(`Contact #${req.params.id} has been deleted`);
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong",
      error,
    });
  }
}

export async function updateContact(req, res) {
  try {
    const { firstName, lastName, mobilePhone, isFavorite } = req.body;
    await Contact.update(
      {
        firstName,
        lastName,
        mobilePhone,
        isFavorite,
      },
      {
        where: { id: req.params.id },
      }
    );

    res.send(`Contact #${req.params.id} has been modified`);
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
      error,
    });
  }
}
