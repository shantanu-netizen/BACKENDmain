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

export { createblog, getBlogs, AuthorById, blogsByName };