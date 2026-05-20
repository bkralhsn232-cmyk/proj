import express from 'express';
import Comment from '../models/comments.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:movieId', async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:movieId', protect, async (req, res) => {
  try {
    const { text, username } = req.body;
    const newComment = await Comment.create({
      movieId: req.params.movieId,
      userId: req.session.userId,
      username: username,
      text
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;