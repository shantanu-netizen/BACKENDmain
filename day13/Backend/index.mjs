import express from "express";
import mongoose from "mongoose";
import router from "./src/router.mjs";
import { port, uri } from "./Backend/config.mjs";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(uri)
  .then(() => console.log("database successfully connected"))
  .catch((err) => console.log(err));
app.use("/", router);
app.listen(port, () => {
  console.log(`your port is ${port}`);
});
