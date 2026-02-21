import express from "express";
import mongoose from "mongoose";
import router from "./src/route.mjs";
import config from "./config.mjs";
const app = express();
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
