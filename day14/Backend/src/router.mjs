import express from "express";
const router = express.Router();
import {
  registerUser,
  getUser,
  login,
  updateUser,
} from "./controllers/userController.mjs";
import { authenticateToken, authorization } from "./auth/authentication.mjs";
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.post("/register", registerUser);
// here authenticateToken is custom middleware
router.get("/user/:id", authenticateToken, getUser);
router.post("/login", login);
router.put("/user/:id", authenticateToken, authorization, updateUser);
export default router;
