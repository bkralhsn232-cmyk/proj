import express from 'express';
import movie from '../models/movie.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', protect, async (req, res) => {
  try {
    const movies = await movie.find({ createdBy: req.session.userId });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', protect, async (req, res) => {
  try {
    const { title, genre, director, releaseYear, rating, imageUrl, description } = req.body;

    const newMovie = await movie.create({
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


router.delete('/:id', protect, async (req, res) => {
  try {
    
    const targetMovie = await movie.findOne({ _id: req.params.id, createdBy: req.session.userId });

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