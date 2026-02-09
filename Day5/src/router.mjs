import express from "express";
import { addMovie, allMovies, findMovie } from "./controllers/movieContoller.mjs";
import { addCast, allCast, findCast } from "./controllers/castContoller.mjs";

const router = express.Router();

router.get("/api", (req, res) => {
  return res.status(200).send({ message: "ok" });
});

router.get("/movies", allMovies);
router.get("/movies/:id", findMovie);

router.get("/casts", allCast);
router.get("/casts/:id", findCast);

router.post("/addmovie", addMovie);
router.post("/addcast", addCast);

export default router;
