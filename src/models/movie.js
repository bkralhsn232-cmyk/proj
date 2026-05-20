// src/models/Movie.js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'يرجى إدخال عنوان الفيلم'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'يرجى إدخال تصنيف الفيلم'],
    trim: true
  },
  director: {
    type: String,
    trim: true
  },
  releaseYear: {
    type: Number,
    required: [true, 'يرجى إدخال سنة الإصدار']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'يرجى إدخال تقييم الفيلم من 1 إلى 5']
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