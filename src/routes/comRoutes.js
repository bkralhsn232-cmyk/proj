import express from 'express';
import Comment from '../models/comments.js';
import User from '../models/User.js'; 
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

router.delete('/:commentId', protect, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.userId);
    if (!currentUser) {
      return res.status(401).json({ message: 'User session invalid' });
    }

    const targetComment = await Comment.findById(req.params.commentId);
    if (!targetComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const isOwner = targetComment.userId.toString() === req.session.userId;
    const isAdmin = currentUser.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Unauthorized: Only the creator or an Admin can delete this comment.' });
    }

    await targetComment.deleteOne();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;