import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    
    
    const dbUrl = process.env.MONGODB_URI || "mongodb://bkralhsn232_db_user:QMWt2mGoipHmM0nI@ac-0gmza2p-shard-00-00.7tufvfa.mongodb.net:27017,ac-0gmza2p-shard-00-01.7tufvfa.mongodb.net:27017,ac-0gmza2p-shard-00-02.7tufvfa.mongodb.net:27017/?ssl=true&replicaSet=atlas-i56pjm-shard-0&authSource=admin&appName=Movie-database";
    
    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;