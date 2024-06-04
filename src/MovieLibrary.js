import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

function MovieLibrary({ setPublicList, setPrivateList }) {
  const [text, setText] = useState("search movie");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added state for loading

  const changeText = (event) => {
    setText(event.target.value);
  };

  const getMovie = async (e) => { // Made getMovie async
    e.preventDefault();
    if (!text) {
      setError("Please enter a movie title");
      return;
    }
    setError(null);
    setIsLoading(true); // Set loading to true before fetching

    try {
      const response = await axios.get(
        "https://www.omdbapi.com/?s=" + text + "&apikey=3a6a2892"
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setMovies([]);
    } finally {
      setIsLoading(false); // Set loading to false after fetching (regardless of success/failure)
    }
  };

  // Debounce logic can be implemented here using a library like lodash or a custom solution 
  // ... (code for debounced search)

  const addToList = (movie, listType) => {
    if (listType === "public") {
      setPublicList((prevPublicList) => [...prevPublicList, movie]);
    } else {
      setPrivateList((prevPrivateList) => [...prevPrivateList, movie]);
    }
  };

  useEffect(() => {
    // Optional: Reset state on component unmount to avoid memory leaks
    return () => {
      setMovies([]);
      setError(null);
      setIsLoading(false);
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className='container my-3'>
      <form className="d-flex" onSubmit={getMovie}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={text}
          onChange={changeText}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <p>Loading...</p>} {/* Added loading indicator */}
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
}

export default MovieLibrary;
