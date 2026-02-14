import blogModel from "../models/blogsModels.mjs";
const createblog = async (req, res) => {
  try {
    let data = req.body;
    let blog = await blogModel.create(data);
    return res.status(201).send({ message: "ok", data: blog });
  } catch (error) {
    return res.status(400).send({ message: "failed" });
  }
};

//GET /blogs

const getBlogs = async (req, res) => {
  try {
    let data = req.query;
    let blogs = await blogModel.find(data);
    return res.status(200).send({ message: "ok", data: blogs });
  } catch (error) {
    return res.status(404).send({ message: "not found", err: error });
  }
};
const AuthorById = async (req, res) => {
  try {
    let { authorId } = req.params;
    let id = await blogModel.findById({ _id: authorId });
    return res.status(200).send({ message: "ok", data: id });
  } catch (error) {
    return res.status(404).send({ message: "not found", err: error });
  }
};
const blogsByName = async (req, res) => {
  try {
    let { category } = req.params;
    let blog = await blogModel.findOne({ category: category });
    return res.status(200).send({ message: "ok", data: blog });
  } catch (error) {
    return res.status(404).send({ message: "not found", err: error });
  }
};

//delete

const blogDelete = async (req, res) => {
  try {
    let { id } = req.params;
    let blog = await blogModel.findByIdAndDelete(id);
    return res.status(200).send({ message: "ok", data: blog });
  } catch (error) {
    return res.status(404).send({ message: "failed", err: error });
  }
};
const deleteBlogsByQuery = async (req, res) => {
  try {
    let { authorId, category, tag, subcategory, unpublished } = req.query;
    let query = {};
    if (authorId) query.authorId = authorId;
    if (category) query.category = category;
    if (tag) query.tag = tag;
    if (subcategory) query.subcategory = subcategory;
    if (unpublished !== undefined) query.unpublished = unpublished;

    let blog = await blogModel.deleteMany(query);

    if (blog.deletedCount === 0) {
      return res.status(404).send({ message: "not found" });
    }
    return res.status(200).send({ message: "ok", data: blog });
  } catch (error) {
    return res.status(500).send({ message: "failed", err: error });
  }
};

const updateBlog = async (req, res) => {
  try {
    let { blogId } = req.params;
    let { title, body, tags, subcategory, isPublished } = req.body;

    // Check if blog exists and is not deleted
    let blog = await blogModel.findOne({ _id: blogId, isDeleted: false });

    if (!blog) {
      return res.status(404).send({ message: "not found" });
    }

    // Update fields if provided
    if (title !== undefined) blog.title = title;
    if (body !== undefined) blog.body = body;

    // Add tags if provided
    if (tags && Array.isArray(tags)) {
      blog.tags = [...new Set([...blog.tags, ...tags])]; // Avoid duplicates
    }

    // Add subcategory if provided
    if (subcategory && Array.isArray(subcategory)) {
      blog.subcategory = [...new Set([...blog.subcategory, ...subcategory])]; // Avoid duplicates
    }

    // Update publish status
    if (isPublished === true) {
      blog.isPublished = true;
      blog.publishedAt = new Date();
    } else if (isPublished === false) {
      blog.isPublished = false;
    }

    await blog.save();

    return res.status(200).send({ message: "ok", data: blog });
  } catch (error) {
    return res.status(500).send({ message: "failed", err: error });
  }
};

export {
  createblog,
  getBlogs,
  AuthorById,
  blogsByName,
  blogDelete,
  deleteBlogsByQuery,
  updateBlog,
};
