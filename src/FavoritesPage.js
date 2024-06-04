import React from 'react';
import MovieCard from './MovieCard';

const FavoritesPage = ({ publicList, privateList, removeFromList }) => (
  <div className='container my-3'>
    <div className='row my-5'>
      <h2>Public Movie List</h2>
      {publicList.length > 0 ? (
        publicList.map((movie, index) => (
          <MovieCard key={index} movie={movie} listType="public" removeFromList={removeFromList} />
        ))
      ) : (
        <p>No movies in public list</p>
      )}
    </div>

    <div className='row my-5'>
      <h2>Private Movie List</h2>
      {privateList.length > 0 ? (
        privateList.map((movie, index) => (
          <MovieCard key={index} movie={movie} listType="private" removeFromList={removeFromList} />
        ))
      ) : (
        <p>No movies in private list</p>
      )}
    </div>
  </div>
);

export default FavoritesPage;
