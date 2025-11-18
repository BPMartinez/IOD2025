
const express = require("express");
const router = express.Router();
let friends = require("./friends");


function getNextId(list) {
  return list.length ? list[list.length - 1].id + 1 : 1;
}


router.get("/", (req, res) => {
  const { minAge, city } = req.query;

  let results = [...friends];

  if (minAge) {
    const age = parseInt(minAge);
    if (!isNaN(age)) {
      results = results.filter((f) => f.age >= age);
    }
  }

  if (city) {
    results = results.filter(
      (f) => f.city.toLowerCase() === city.toLowerCase()
    );
  }

  res.json({
    count: results.length,
    friends: results,
  });
});

// GET /friends/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const friend = friends.find((f) => f.id === id);

  if (!friend) {
    return res.status(404).json({ error: "Friend not found" });
  }

  res.json(friend);
});

router.post("/", (req, res) => {
  const { name, age, city } = req.body;

  if (!name || !city || typeof age === "undefined") {
    return res.status(400).json({
      error: "name, age, and city are required",
    });
  }

  const newFriend = {
    id: getNextId(friends),
    name,
    age: Number(age),
    city,
  };

  friends.push(newFriend);

  res.status(201).json({
    message: "Friend added",
    friend: newFriend,
  });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const friend = friends.find((f) => f.id === id);

  if (!friend) {
    return res.status(404).json({ error: "Friend not found" });
  }

  const { name, age, city } = req.body;

  if (name) friend.name = name;
  if (typeof age !== "undefined") friend.age = Number(age);
  if (city) friend.city = city;

  res.json({
    message: "Friend updated",
    friend,
  });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = friends.findIndex((f) => f.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Friend not found" });
  }

  const deleted = friends.splice(index, 1)[0];

  res.json({
    message: "Friend deleted",
    friend: deleted,
  });
});

/* -----------------------------------------
   MOVIE ROUTES (EXTENSION PART)
------------------------------------------*/

let movies = [
  { id: 1, title: "Inception", year: 2010, rating: 8.8 },
  { id: 2, title: "The Matrix", year: 1999, rating: 8.7 },
];

router.get("/movies", (req, res) => {
  res.json(movies);
});

router.get("/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (!movie) return res.status(404).json({ error: "Movie not found" });

  res.json(movie);
});

router.post("/movies", (req, res) => {
  const { title, year, rating } = req.body;

  if (!title || typeof year === "undefined") {
    return res.status(400).json({ error: "Title and year are required" });
  }

  const newMovie = {
    id: getNextId(movies),
    title,
    year,
    rating: rating ? Number(rating) : null,
  };

  movies.push(newMovie);
  res.status(201).json({ message: "Movie added", movie: newMovie });
});

router.put("/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (!movie) return res.status(404).json({ error: "Movie not found" });

  const { title, year, rating } = req.body;

  if (title) movie.title = title;
  if (typeof year !== "undefined") movie.year = Number(year);
  if (typeof rating !== "undefined") movie.rating = Number(rating);

  res.json({ message: "Movie updated", movie });
});

router.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((m) => m.id === id);

  if (index === -1) return res.status(404).json({ error: "Movie not found" });

  const deleted = movies.splice(index, 1)[0];

  res.json({ message: "Movie deleted", movie: deleted });
});

module.exports = router;
