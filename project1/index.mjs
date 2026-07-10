import express from "express";
import mongoose from "mongoose";
import router from "./src/router.mjs";
import config from "./config.mjs";
const app = express();
app.use(express.json());
mongoose
  .connect(config.uri)
  .then(() => console.log("connect to db"))
  .catch((err) => console.log(`your port is ${config.port}`));
app.use("/", router);
app.listen(config.port, () => {
  console.log(`server started at port ${config.port}`);
});