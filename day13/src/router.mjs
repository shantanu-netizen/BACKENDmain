import express from "express";
const router = express.Router();
import { getUser, userCreate } from "./controllers/userController.mjs";
router.get("/", (req, res) => {
  res.status(200).send({ message: "welcome" });
});
router.post("/create", userCreate);
router.get("/:id", getUser);
export default router;
