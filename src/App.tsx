import React, { useState } from 'react';
import type { Movie, MovieList } from './types/Movie';
import { useMovieLists } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { SearchMovies } from './components/SearchMovies';
import { Lists } from './components/Lists';
import { MovieDetails } from './components/MovieDetails';
import { ListManager } from './components/ListManager';

type View = 'home' | 'search' | 'lists';

function App() {
  // State management
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showListManager, setShowListManager] = useState(false);
  const [editingList, setEditingList] = useState<MovieList | null>(null);
  const [movieToAdd, setMovieToAdd] = useState<Movie | null>(null);

  // List management
  const {
    lists,
    addList,
    updateList,
    deleteList,
    addMovieToList,
    removeMovieFromList,
  } = useMovieLists();

  // Event handlers
  const handleViewDetails = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleAddToList = (movie: Movie) => {
    setMovieToAdd(movie);
    setShowListManager(true);
  };

  const handleCreateList = () => {
    setMovieToAdd(null);
    setEditingList(null);
    setShowListManager(true);
  };

  const handleEditList = (list: MovieList) => {
    setEditingList(list);
    setMovieToAdd(null);
    setShowListManager(true);
  };

  const handleSaveList = (name: string, description: string, isPrivate: boolean) => {
    if (editingList) {
      // Update existing list
      updateList(editingList.id, { name, description, isPrivate });
    } else {
      // Create new list
      const newList = addList(name, description, isPrivate);
      
      // Add movie to new list if one was selected
      if (movieToAdd) {
        addMovieToList(newList.id, movieToAdd);
      }
    }
    
    setShowListManager(false);
    setEditingList(null);
    setMovieToAdd(null);
  };

  const handleAddToExistingList = (listId: string, movie: Movie) => {
    addMovieToList(listId, movie);
    setShowListManager(false);
    setMovieToAdd(null);
  };

  const handleCloseListManager = () => {
    setShowListManager(false);
    setEditingList(null);
    setMovieToAdd(null);
  };

  const handleNavigateToSearch = () => {
    setCurrentView('search');
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view as View);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <Header
          currentView={currentView}
          onViewChange={handleViewChange}
          onCreateList={handleCreateList}
        />

        {/* Main Content */}
        <main className="pb-8">
          {currentView === 'home' && (
            <Home
              onViewDetails={handleViewDetails}
              onAddToList={handleAddToList}
              onNavigateToSearch={handleNavigateToSearch}
            />
          )}

          {currentView === 'search' && (
            <SearchMovies
              onViewDetails={handleViewDetails}
              onAddToList={handleAddToList}
            />
          )}

          {currentView === 'lists' && (
            <Lists
              lists={lists}
              onViewDetails={handleViewDetails}
              onAddToList={handleAddToList}
              onEditList={handleEditList}
              onDeleteList={deleteList}
              onRemoveMovieFromList={removeMovieFromList}
            />
          )}
        </main>

        {/* Modals */}
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={handleCloseDetails}
            onAddToList={handleAddToList}
          />
        )}

        {showListManager && (
          <ListManager
            onClose={handleCloseListManager}
            onSave={handleSaveList}
            onAddToExisting={handleAddToExistingList}
            existingLists={lists}
            editingList={editingList}
            selectedMovie={movieToAdd}
          />
        )}
      </div>
    </div>
  );
}

export default App;