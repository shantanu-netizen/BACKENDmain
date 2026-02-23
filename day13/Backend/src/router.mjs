import express from "express";
const router = express.Router();
import {
  getUser,
  login,
  updateUser,
  userCreate,
} from "./controllers/userController.mjs";
import { authenticateToken } from "./auth/authentication.mjs";
router.get("/", (req, res) => {
  res.status(200).send({ message: "welcome" });
});
router.post("/register", userCreate);
// here authenticateToken is custom middleware
router.get("/user/:id", authenticateToken, getUser);
router.post("/login", login);
router.put("/user/:id", authenticateToken, updateUser);
export default router;
