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
    ref: 'User', 
    required: true
  }
}, {
  timestamps: true 
});

movieSchema.index({ title: 1, releaseYear: 1 }, { unique: true });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;