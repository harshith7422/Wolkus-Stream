import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const HomePage = ({ addToList }) => {
  const [text, setText] = useState("search movie");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const changeText = (event) => {
    setText(event.target.value);
  }

  const getMovie = (e) => {
    e.preventDefault();
    if (!text) {
      setError("Please enter a movie title");
      return;
    }
    setError(null);
    axios.get("https://www.omdbapi.com/?s=" + text + "&apikey=3a6a2892")
      .then((response) => {
        if (response.data.Response === "True") {
          setMovies(response.data.Search || []);
        } else {
          setError(response.data.Error);
          setMovies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setMovies([]);
      });
  }

  return (
    <div className='container my-3'>
      <form className="d-flex" onSubmit={getMovie}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={text} onChange={changeText} />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      {error && <p className="text-danger">{error}</p>}
      <div className='row'>
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} addToList={addToList} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
