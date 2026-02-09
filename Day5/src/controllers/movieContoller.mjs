import movieModel from "../models/movieModel.mjs";

const addMovie = async (req, res) => {
  try {
    const data = req.body;
    const movie = await movieModel.create(data);
    return res.status(201).send({ message: "ok", data: movie });
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

const allMovies = async (req, res) => {
  try {
    const movies = await movieModel.find({});
    return res.status(200).send({ message: "ok", data: movies });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "falied", error: error.message });
  }
};

const findMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findById(id);
    return res.status(200).send({ message: "ok", data: movie });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "falied", error: error.message });
  }
};

export { allMovies, addMovie, findMovie };