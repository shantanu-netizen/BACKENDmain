import express from "express";
import {
  createblog,
  getBlogs,
  blogsByName,
  AuthorById,
  blogDelete,
  deleteBlogsByQuery,
  updateBlog,
} from "./contollers/blogsContoller.mjs";
import { createAuthor,allAuthor,findAuthor} from "./contollers/authorContoller.mjs";
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).send({ message: "allright" });
});

router.post("/blogs", createblog);
router.post("/authors", createAuthor);
router.get("/authors", allAuthor);
router.get("/authors/:id", findAuthor);
router.get("/blogs", getBlogs);
router.get("/blogs/:category", blogsByName);
router.get("/blogs/:id", AuthorById);
router.delete("/blogs/:id", blogDelete);
router.delete("/blogs", deleteBlogsByQuery);
router.put("/blogs/:blogId", updateBlog);
export default router;