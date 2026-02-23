import express from "express";
import mongoose from "mongoose";
import config from "./config.mjs";
import router from "./src/router.mjs";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.use("/", router);
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
