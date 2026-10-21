
import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";

const router = express.Router();

router.use(authenticate);

// GET /api/watchlist/:userId
router.get("/:userId", (req, res) => {
  const watchlist = getWatchlist(req.params.userId);

  if (watchlist === null) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(watchlist);
});

// POST /api/watchlist/:userId/movies
router.post("/:userId/movies", authorizeModification, (req, res) => {
  const movie = addMovie(req.params.userId, req.body || {});

  if (movie === null) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(201).json(movie);
});

// PUT /api/watchlist/:userId/movies/:movieId
router.put(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const movieId = Number(req.params.movieId);
    const movie = updateMovie(req.params.userId, movieId, req.body || {});

    if (movie === null) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.status(200).json(movie);
  },
);

// DELETE /api/watchlist/:userId/movies/:movieId
router.delete(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const deleted = deleteMovie(
      req.params.userId,
      Number(req.params.movieId),
    );

    if (!deleted) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.status(200).json({
      message: "Movie deleted successfully.",
    });
  },
);

export default router;


