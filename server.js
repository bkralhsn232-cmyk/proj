import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import connectDB from './src/config/db.js';
import movieRoutes from './src/routes/movieRoutes.js';
import authRoutes from './src/routes/authRoutes.js'; 
dotenv.config();
const app = express();
// Database Connection with Fallback String
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
  credentials: true 
}));

app.use(express.json());

// Session Configuration with Fallback Store URL
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'supersecretkey123', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    
    mongoUrl: process.env.MONGODB_URI || "mongodb://bkralhsn232_db_user:QMWt2mGoipHmM0nI@ac-0gmza2p-shard-00-00.7tufvfa.mongodb.net:27017,ac-0gmza2p-shard-00-01.7tufvfa.mongodb.net:27017,ac-0gmza2p-shard-00-02.7tufvfa.mongodb.net:27017/?ssl=true&replicaSet=atlas-i56pjm-shard-0&authSource=admin&appName=Movie-database",
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

app.use('/api/auth', authRoutes);   
app.use('/api/movies', movieRoutes); 

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ 
        status: "success", 
        message: "Backend API is live and running perfectly!" 
    });
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running live on port ${PORT}`);
});