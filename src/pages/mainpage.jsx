import React, { useState } from "react";
import { Link } from "react-router-dom";

function Mainpage() {
  const moviesData = [
    { id: 1, title: "Inception", rating: 8.8, year: 2010, poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg" },
    { id: 2, title: "Interstellar", rating: 8.6, year: 2014, poster: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg" },
    { id: 3, title: "Titanic", rating: 7.8, year: 1997, poster: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png" },
    { id: 4, title: "Avatar", rating: 7.9, year: 2009, poster: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg" },
    { id: 5, title: "Joker", rating: 8.4, year: 2019, poster: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg" },
    { id: 6, title: "The Dark Knight", rating: 9.0, year: 2008, poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg" },
    { id: 7, title: "Frozen", rating: 7.4, year: 2013, poster: "https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29_poster.jpg" },
    { id: 8, title: "Gladiator", rating: 8.5, year: 2000, poster: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png" },
    { id: 9, title: "Matrix", rating: 8.7, year: 1999, poster: "https://upload.wikimedia.org/wikipedia/en/d/db/The_Matrix.png" },
    { id: 10, title: "Avengers", rating: 8.0, year: 2012, poster: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg" }
  ];

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredMovies = moviesData
    .filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating);

  return (
    <div style={{ 
      padding: "20px", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #000000 0%, #2d004d 100%)", 
      color: "white", 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
    }}>
      
      {/* Header with Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: "#bb86fc", margin: 0 }}>🎬 Movies</h1>
        <Link to="/login" style={{ 
          color: '#bb86fc', 
          textDecoration: 'none', 
          border: '1px solid #bb86fc', 
          padding: '8px 20px', 
          borderRadius: '20px',
          transition: '0.3s'
        }}>
          Login
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ 
            padding: "12px", 
            width: '300px',
            borderRadius: "8px", 
            border: "1px solid #444", 
            backgroundColor: "rgba(255,255,255,0.1)", 
            color: "white",
            outline: 'none'
          }}
        />

        <select 
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ 
            padding: "12px", 
            borderRadius: "8px", 
            backgroundColor: "#1e1e1e", 
            color: "white", 
            border: "1px solid #444",
            cursor: 'pointer'
          }}
        >
          <option value="asc">Rating: Low to High</option>
          <option value="desc">Rating: High to Low</option>
        </select>
      </div>

      {/* Movie Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
        gap: "30px"
      }}>
        {filteredMovies.map(movie => (
          <div key={movie.id} style={{ 
            backgroundColor: "rgba(255,255,255,0.05)", 
            borderRadius: "15px", 
            overflow: "hidden",
            boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
            transition: 'transform 0.3s'
          }}>
            <img 
              src={movie.poster} 
              alt={movie.title} 
              style={{ width: "100%", height: "270px", objectFit: "cover" }} 
              onError={(e) => { e.target.src = "https://via.placeholder.com/180x270?text=No+Poster"; }}
            />
            <div style={{ padding: "12px" }}>
              <h3 style={{ fontSize: "1rem", margin: "0 0 8px 0", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {movie.title}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#bb86fc' }}>
                <span>⭐ {movie.rating}</span>
                <span style={{ color: '#aaa' }}>{movie.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredMovies.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '50px', color: '#aaa' }}>No matches found for "{search}"</p>
      )}
    </div>
  );
}

export default Mainpage;