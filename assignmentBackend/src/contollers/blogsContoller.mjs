import blogModel from "../models/blogsModels.mjs";
import authorModel from "../models/authorModel.mjs";
import mongoose from "mongoose";

const createblog = async (req, res) => {
  try {
    let data = req.body;
    let authorId = data.authorId;
    if (!authorId) {
      return res
        .status(400)
        .send({ message: "failed", error: "author id is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res
        .status(400)
        .send({ message: "failed", error: "author id is not valid" });
    }
    let author = await authorModel.findById(authorId);
    if (author == null) {
      return res
        .status(400)
        .send({ message: "failed", error: "author not found" });
    }
    let blog = await blogModel.create(data);
    return res.status(201).send({ status: true, data: blog });
  } catch (error) {
    if (error.message.includes("duplicate")) {
      return res.status(400).send({ message: "failed", error: error.message });
    }
    if (error.message.includes("validation")) {
      return res.status(400).send({ message: "failed", error: error.message });
    } else {
      return res.status(500).send({ message: "failed", error: error.message });
    }
  }
};

//GET /blogs

const getBlogs = async (req, res) => {
  try {
    let query = { isDeleted: false, isPublished: true };
    let { authorId, category, tags, subcategory } = req.query;
    if (subcategory) {
           query.subcategory = { $in: subcategory };
    }
    if (tags) {
      query.tags = { $in: tags };
    }
    if (authorId) {
        if (mongoose.Types.ObjectId.isValid(authorId)) {
        query.authorId = new mongoose.Types.ObjectId(authorId);
      }
    }
    if (category) {
      query.category = category;
    }
    let blogs = await blogModel.find(query);
    if (blogs.length === 0) {
      return res.status(404).send({ status: false, message: "Blog not found" });
    }
    return res
      .status(200)
      .send({ status: true, message: "Blogs list", data: blogs });
  } catch (error) {
    return res.status(500).send({ message: "failed", error: error.message });
  }
};

//delete

const blogDelete = async (req, res) => {
  try {
    let { id } = req.params;
    let blog = await blogModel.findByIdAndDelete(id);
    return res.status(200).send({ status: true, message: "ok", data: blog });
  } catch (error) {
    return res.status(404).send({ status: false, message: "failed", error: error.message });
  }
};
const deleteBlogsByQuery = async (req, res) => {
  try {
    let { authorId, category, tags, subcategory, isPublished } = req.query;
    let query = {};
    if (authorId) {
      if (mongoose.Types.ObjectId.isValid(authorId)) {
        query.authorId = new mongoose.Types.ObjectId(authorId);
      }
    }
    if (category) query.category = category;
    if (tags) {
      let tagsArray = Array.isArray(tags) ? tags : [tags];
      query.tags = { $in: tagsArray };
    }
    if (subcategory) {
      query.subcategory = { $in: subcategory };
    }
    if (isPublished !== undefined) query.isPublished = isPublished === "true";

    let blog = await blogModel.deleteMany(query);

    if (blog.deletedCount === 0) {
      return res
        .status(404)
        .send({status:false, message: "failed", error: "no blogs found to delete" });
    }
    return res
      .status(200)
      .send({
        status: true,
        message: "Blogs deleted successfully",
        data: blog,
      });
  } catch (error) {
    return res.status(500).send({ message: "failed", error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    let { blogId } = req.params;
    let { title, body, tags, subcategory, isPublished } = req.body;

    // Validate blogId
    if (!blogId) {
      return res
        .status(400)
        .send({ message: "failed", error: "blogId is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res
        .status(400)
        .send({ message: "failed", error: "blogId is not valid" });
    }

    // Check if blog exists and is not deleted
    let blog = await blogModel.findOne({
      _id: new mongoose.Types.ObjectId(blogId),
      isDeleted: false,
    });

    if (!blog) {
      return res
        .status(404)
        .send({ message: "failed", error: "blog not found" });
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


    return res
      .status(200)
      .send({ status: true, message: "Blog updated successfully", data: blog });
  } catch (error) {
    return res.status(500).send({ message: "failed", error: error.message });
  }
};

export { createblog, getBlogs, blogDelete, deleteBlogsByQuery, updateBlog };
