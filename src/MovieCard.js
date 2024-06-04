import React from 'react';

const MovieCard = ({ movie, addToList, listType, removeFromList }) => (
  <div className='col-3'>
    <div className="card" style={{ width: "18rem" }}>
      <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
      <div className="card-body">
        <h5 className="card-text">{movie.Title}</h5>
        <h6 className="card-title">{movie.Year}</h6>
        {addToList ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() => addToList(movie, "public")}
            >
              Add to Public List
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => addToList(movie, "private")}
            >
              Add to Private List
            </button>
          </>
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => removeFromList(movie, listType)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  </div>
);

export default MovieCard;
