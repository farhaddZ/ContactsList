import express from "express";
import { createContact, deleteContact, getContacts, updateContact } from "../controllers/contacts.js";

const router = express.Router();

// ----- Show List Route -----
router.get("/list", getContacts);
//  ----- Creat new Contact Route -----
router.post("/new", createContact);
//  ---- Delete contact route -----
router.delete("/:id", deleteContact);
// -------- modify contact route -----
router.put("/:id", updateContact);



export default router;
