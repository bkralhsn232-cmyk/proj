import express from 'express';
import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import User from '../models/user.js'; 
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({ });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.delete('/:id', protect, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid movie ID format' });
    }

    const currentUser = await User.findById(req.session.userId);
    if (!currentUser) {
      return res.status(401).json({ message: 'User session invalid' });
    }

    const targetMovie = await Movie.findById(req.params.id);
    if (!targetMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const isOwner = targetMovie.createdBy.toString() === req.session.userId;
    const isAdmin = currentUser.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Only the creator or an Admin can delete this title.' });
    }

    await targetMovie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid movie ID format' });
    }

    const currentUser = await User.findById(req.session.userId);
    if (!currentUser) {
      return res.status(401).json({ message: 'User session invalid' });
    }

    const targetMovie = await Movie.findById(req.params.id);
    if (!targetMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const isOwner = targetMovie.createdBy.toString() === req.session.userId;
    const isAdmin = currentUser.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Only the creator or an Admin can update this title.' });
    }

    const { title, genre, director, releaseYear, rating, imageUrl, description } = req.body;

    targetMovie.title = title ?? targetMovie.title;
    targetMovie.genre = genre ?? targetMovie.genre;
    targetMovie.director = director ?? targetMovie.director;
    targetMovie.releaseYear = releaseYear ?? targetMovie.releaseYear;
    targetMovie.rating = rating ?? targetMovie.rating;
    targetMovie.imageUrl = imageUrl ?? targetMovie.imageUrl;
    targetMovie.description = description ?? targetMovie.description;

    const updatedMovie = await targetMovie.save();
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: 'Server error while updating movie' });
  }
});

export default router;