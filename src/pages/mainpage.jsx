import React, { useState, useEffect } from 'react';

function MainPage() {
  const [movies, setMovies] = useState([]); // Starts completely empty instead of using mock data

  useEffect(() => {
    // Fetch live data directly from Person A's backend route
    fetch('mongodb+srv://bkralhsn232_db_user:LWnsMXOHWoytOxoO@movie-database.7tufvfa.mongodb.net/?appName=Movie-database')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Error loading movies:", err));
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "15px" }}>
      {movies.map(movie => (
        <div key={movie._id} className="movie-card">
          <img src={movie.imageUrl} alt={movie.title} style={{ width: "100%" }} />
          <h3>{movie.title}</h3>
          <p>{movie.genre}</p>
          <small>بواسطة: {movie.createdBy?.username || 'مجهول'}</small>
        </div>
      ))}
    </div>
  );
}