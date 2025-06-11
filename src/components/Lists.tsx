import React, { useState } from 'react';
import { 
  List, Lock, Globe, Calendar, Edit2, Trash2, Eye, 
  Plus, Users, Film, MoreVertical 
} from 'lucide-react';
import type { MovieList, Movie } from '../types/Movie';
import { MovieCard } from './MovieCard';

interface ListsProps {
  lists: MovieList[];
  onViewDetails: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
  onEditList: (list: MovieList) => void;
  onDeleteList: (listId: string) => void;
  onRemoveMovieFromList: (listId: string, movieId: string) => void;
}

export const Lists: React.FC<ListsProps> = ({
  lists,
  onViewDetails,
  onAddToList,
  onEditList,
  onDeleteList,
  onRemoveMovieFromList,
}) => {
  const [selectedList, setSelectedList] = useState<MovieList | null>(null);
  const [showPrivate, setShowPrivate] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const publicLists = lists.filter(list => !list.isPrivate);
  const privateLists = lists.filter(list => list.isPrivate);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const ListCard: React.FC<{ list: MovieList }> = ({ list }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden group hover:border-purple-500/50 transition-all duration-200">
      {/* Preview Images */}
      <div className="relative h-32 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        {list.movies.length > 0 ? (
          <div className="grid grid-cols-4 h-full">
            {list.movies.slice(0, 4).map((movie, index) => (
              <div key={movie.imdbID} className="relative overflow-hidden">
                <img
                  src={movie.Poster && movie.Poster !== 'N/A' 
                    ? movie.Poster 
                    : `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop`}
                  alt={movie.Title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop`;
                  }}
                />
                {index === 3 && list.movies.length > 4 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      +{list.movies.length - 4}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Film className="h-12 w-12 text-gray-600" />
          </div>
        )}
        
        {/* Privacy Badge */}
        <div className="absolute top-3 left-3">
          {list.isPrivate ? (
            <div className="bg-red-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center space-x-1 text-xs font-medium">
              <Lock className="h-3 w-3" />
              <span>Private</span>
            </div>
          ) : (
            <div className="bg-green-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center space-x-1 text-xs font-medium">
              <Globe className="h-3 w-3" />
              <span>Public</span>
            </div>
          )}
        </div>

        {/* Actions Dropdown */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === list.id ? null : list.id)}
              className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/70 transition-all duration-200"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {activeDropdown === list.id && (
              <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[160px]">
                <button
                  onClick={() => {
                    setSelectedList(list);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-200"
                >
                  <Eye className="h-4 w-4" />
                  <span>View List</span>
                </button>
                <button
                  onClick={() => {
                    onEditList(list);
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-200"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit List</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this list?')) {
                      onDeleteList(list.id);
                    }
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700 flex items-center space-x-2 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete List</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg mb-2 line-clamp-1">
          {list.name}
        </h3>
        
        {list.description && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {list.description}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Film className="h-4 w-4" />
              <span>{list.movies.length} {list.movies.length === 1 ? 'movie' : 'movies'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(list.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedList) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* List Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedList(null)}
              className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2"
            >
              <List className="h-5 w-5" />
              <span>Back to Lists</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onEditList(selectedList)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this list?')) {
                    onDeleteList(selectedList.id);
                    setSelectedList(null);
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {selectedList.name}
                </h1>
                {selectedList.description && (
                  <p className="text-gray-400 text-lg">
                    {selectedList.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedList.isPrivate ? (
                  <div className="bg-red-600/20 text-red-400 border border-red-600/30 px-3 py-1 rounded-full flex items-center space-x-1 text-sm">
                    <Lock className="h-3 w-3" />
                    <span>Private</span>
                  </div>
                ) : (
                  <div className="bg-green-600/20 text-green-400 border border-green-600/30 px-3 py-1 rounded-full flex items-center space-x-1 text-sm">
                    <Globe className="h-3 w-3" />
                    <span>Public</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Film className="h-4 w-4" />
                <span>{selectedList.movies.length} {selectedList.movies.length === 1 ? 'movie' : 'movies'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Updated {formatDate(selectedList.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {selectedList.movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
            {selectedList.movies.map((movie) => (
              <div key={movie.imdbID} className="group relative">
                <MovieCard
                  movie={movie}
                  onViewDetails={onViewDetails}
                  onAddToList={onAddToList}
                  showAddButton={false}
                />
                
                {/* Remove Button */}
                <button
                  onClick={() => {
                    if (window.confirm('Remove this movie from the list?')) {
                      onRemoveMovieFromList(selectedList.id, movie.imdbID);
                    }
                  }}
                  className="absolute top-2 right-2 bg-red-600/80 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110"
                  title="Remove from list"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Film className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No movies in this list</h3>
            <p className="text-gray-500 mb-6">
              Start adding movies to build your collection
            </p>
            <button
              onClick={() => setSelectedList(null)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Browse Movies
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Your Movie Lists</h2>
        <p className="text-gray-400">
          Organize and manage your favorite movies and shows
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50">
          <button
            onClick={() => setShowPrivate(false)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              !showPrivate
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Public Lists ({publicLists.length})</span>
            </div>
          </button>
          <button
            onClick={() => setShowPrivate(true)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              showPrivate
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Private Lists ({privateLists.length})</span>
            </div>
          </button>
        </div>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(showPrivate ? privateLists : publicLists).map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>

      {/* Empty State */}
      {(showPrivate ? privateLists : publicLists).length === 0 && (
        <div className="text-center py-16">
          <List className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No {showPrivate ? 'private' : 'public'} lists yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first list to start organizing your movies
          </p>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
};