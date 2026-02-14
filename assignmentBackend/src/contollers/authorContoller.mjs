import authorModel from "../models/authorModel.mjs";
const createAuthor = async (req, res) => {
  try {
    let data = req.body;
    let author = await authorModel.create(data);
    return res.status(201).send({ message: "ok", data: author });
  } catch (error) {
    return res.status(400).send({ message: "failed" });
  }
};
const allAuthor = async (req, res) => {
  try {
    const authors = await authorModel.find({});
    return res.status(200).send({ message: "ok", data: authors });
  } catch (error) {
    return res.status(500).send({ message: "failed", error: error.message });
  }
};

const findAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await authorModel.findById(id);
    return res.status(200).send({ message: "ok", data: author });
  } catch (error) {
    return res.status(500).send({ message: "failed", error: error.message });
  }
};
export { createAuthor, allAuthor, findAuthor };