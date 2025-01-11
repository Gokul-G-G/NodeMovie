const express = require("express");
const router = express.Router();
const movies = require("../movies");

router.get("/", (req, res) => {
  try {
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ error: "Movies Not Available" });
  }
});

//Select single item using an Id

router.get("/:id", (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    const movie = movies.find((item) => item.id === movieId);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: "Item Not Available" });
    }
  } catch (error) {
    res.status(404).json({ error: "ovies Not Available" });
  }
});

//Add New Item to the list
router.post("/", (req, res) => {
  try {
    if (!req.body)
      res.status(400).json({
        message: "title, genre, releaseYear, and rating are required",
      });
    const { title, genre, releaseYear, rating } = req.body;
    if (!title || !genre || !releaseYear || !rating)
      res.status(400).json({
        message: "title, genre, releaseYear, and rating are required",
      });
    const newMovie = {
      id: movies.length ? movies[movies.length - 1].id + 1 : 1,
      title,
      genre,
      releaseYear,
      rating,
    };
    movies.push(newMovie);
    res
      .status(201)
      .json({ message: "Movie added succesfully", movie: newMovie });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

//Update Rating by Id

router.patch("/:id", (req, res) => {
  const { rating } = req.body;

  if (
    rating === undefined ||
    typeof rating !== "number" ||
    rating < 0 ||
    rating > 10
  ) {
    return res
      .status(400)
      .json({ error: "Valid rating between 0 and 10 is required" });
  }

  const movie = movies.find((item) => item.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  movie.rating = rating;
  res.json(movie);
});

//Delete a movie by id

router.delete("/:id",(req, res) => {
  const movieIndex = movies.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );
  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  res.status(204).send();
});

module.exports = router;
