import express from 'express';
import Movie from '../models/Movie.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. GET ALL MOVIES (GET /api/movies)
router.get('/', protect, async (req, res) => {
  try {
    const movies = await Movie.find({ createdBy: req.session.userId });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. CREATE A MOVIE (POST /api/movies)
router.post('/', protect, async (req, res) => {
  try {
    const { title, genre, director, releaseYear, rating, imageUrl, description } = req.body;

    const newMovie = await Movie.create({
      title,
      genre,
      director,
      releaseYear,
      rating,
      imageUrl,
      description,
      createdBy: req.session.userId 
    });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. DELETE A MOVIE (DELETE /api/movies/:id)
router.delete('/:id', protect, async (req, res) => {
  try {
    // Only find the movie if it belongs to the logged-in user
    const targetMovie = await Movie.findOne({ _id: req.params.id, createdBy: req.session.userId });

    if (!targetMovie) {
      return res.status(404).json({ message: 'الفيلم غير موجود أو غير مصرح لك بحذفه' });
    }

    await targetMovie.deleteOne();
    res.json({ message: 'تم حذف الفيلم بنجاح' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;