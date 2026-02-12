import express from "express";
import mongoose from "mongoose";
import router from "./src/router.mjs";
import { PORT, uri } from "./config.mjs";
const app = express();
app.use(express.json());
mongoose
  .connect(uri)
  .then(() => console.log("database succcesfull"))
  .catch((err) => console.log(err));
app.use("/", router);
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});