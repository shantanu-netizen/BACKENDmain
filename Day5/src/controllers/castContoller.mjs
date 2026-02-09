import castModel from "../models/castModel.mjs";

const addCast = async (req, res) => {
  try {
    const data = req.body;
    const cast = await castModel.create(data);
    return res.status(201).send({ message: "ok", data: cast });
  } catch (error) {
    if (error.message.includes("validation")) {
      return res.status(400).send({ message: "falied", error: error.message });
    } else if (error.message.includes("duplicate")) {
      return res.status(400).send({ message: "falied", error: error.message });
    } else {
      return res.status(500).send({ message: "falied", error: error.message });
    }
  }
};

const allCast = async (req, res) => {
  try {
    const cast = await castModel.find({});
    return res.status(200).send({ message: "ok", data: cast });
  } catch (error) {
    return res.status(500).send({ message: "falied", error: error.message });
  }
};

const findCast = async (req, res) => {
  try {
    const { id } = req.params;
    const cast = await castModel.findById(id);
    return res.status(200).send({ message: "ok", data: cast });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "falied", error: error.message });
  }
};

export { allCast, addCast, findCast };