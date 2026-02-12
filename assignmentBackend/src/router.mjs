import express from "express";
import { createblog, getBlogs,blogsByName,AuthorById } from "./contollers/blogsContoller.mjs";
import { createAuthor} from "./contollers/authorContoller.mjs";
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).send({ message: "allright" });
});

router.post("/blogs", createblog);
router.post("/authors", createAuthor);
router.get("/blogs", getBlogs);
router.get("/blogs/:category", blogsByName);
router.get("/blogs/:id", AuthorById);
export default router;