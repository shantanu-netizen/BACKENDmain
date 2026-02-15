import express from "express";
import {
  createblog,
  getBlogs,
  blogDelete,
  deleteBlogsByQuery,
  updateBlog,
} from "./contollers/blogsContoller.mjs";
import { createAuthor } from "./contollers/authorContoller.mjs";
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).send({ message: "allright" });
});

router.post("/blogs", createblog);
router.post("/authors", createAuthor);
router.get("/blogs", getBlogs);
router.delete("/blogs/:id", blogDelete);
router.delete("/blogs", deleteBlogsByQuery);
router.put("/blogs/:blogId", updateBlog);
export default router;