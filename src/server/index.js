import express from "express";
import bodyParser from 'body-parser';
import loggerMiddleware from "./middlewares/logger.js";
import routes from "./routes/contacts.js";
import { sequelize } from "../models/index.js";

try{
  await sequelize.sync({ alter: true });
  console.log('All models were synchronized successfully.');
} catch(error) {
  console.log('Error in syncing models:', error);
  throw error;
}

const app = express();

app.disable("etag");

app.use(bodyParser.urlencoded({extended: false}));
app.use(loggerMiddleware);
app.use('/contacts', routes);

app.listen(3000, () => {
  console.log("hello server is listening to port 3000");
});
