// src/models/Movie.js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a movie title'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Please enter a movie genre'],
    trim: true
  },
  director: {
    type: String,
    trim: true
  },
  releaseYear: {
    type: Number,
    required: [true, 'Please enter the release year']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'please enter a rating between 1 and 10']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Links this movie directly to the user who added it
    required: true
  }
}, {
  timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields in MongoDB
});

// Create the model using the schema
const movie = mongoose.model('Movie', movieSchema);

// CRUCIAL: This provides the default export that movieRoutes.js is hunting for!
export default movie;