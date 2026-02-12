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
export { createAuthor };