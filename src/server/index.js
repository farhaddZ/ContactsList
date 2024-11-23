import express from "express";
import bodyParser from "body-parser";
import loggerMiddleware from "./middlewares/logger.js";
import contactsRoutes from "./routes/contacts.js";
import imagesRoutes from "./routes/images.js";
import { sequelize } from "../models/index.js";
import configs from '../configs/server.js'

try {
  await sequelize.sync({ force : false});
  console.log("All models were synchronized successfully.");
} catch (error) {
  console.log("Error in syncing models:", error);
  throw error;
}

const app = express();

app.disable("etag");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use("/contacts", contactsRoutes);
app.use("/images", imagesRoutes);

app.listen(configs.port, () => {
  console.log("hello server is listening to port 3000");
});
