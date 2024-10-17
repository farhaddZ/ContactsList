import express from "express";

import { Contact } from "../../models/index.js";
import { getContacts } from "../controllers/contacts.js";

const router = express.Router();

// ----- Show List Route -----
router.get("/list", getContacts);

//  ----- Creat new Contact Route -----
router.post("/new", async (req, res) => {
  const { firstName, lastName, mobilePhone, isFavorite } = req.body;

  try {
    const { id } = await Contact.create({
      firstName,
      lastName,
      mobilePhone,
      isFavorite,
    });

    res.send(`The contact "#${id} ${firstName} ${lastName}" has been created`);
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong",
      error,
    });
  }
});

//  ---- Delete contact route -----
router.delete("/:id", async (req, res) => {
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
});

// -------- modify contact route -----
router.put("/:id", async (req, res) => {
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
});

export default router;
