import React from 'react';
import { Star, Calendar, Clock, Plus, Eye } from 'lucide-react';
import type { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onViewDetails: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
  showAddButton?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onViewDetails,
  onAddToList,
  showAddButton = true,
}) => {
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop`;

  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-800/70">
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.Title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop`;
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onViewDetails(movie)}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </button>
          {showAddButton && (
            <button
              onClick={() => onAddToList(movie)}
              className="bg-purple-600/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-purple-600 transition-all duration-200 transform hover:scale-110"
              title="Add to List"
            >
              <Plus className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Rating Badge */}
        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
          <div className="absolute top-3 right-3 bg-yellow-500/90 backdrop-blur-sm text-black px-2 py-1 rounded-lg flex items-center space-x-1 text-sm font-semibold">
            <Star className="h-3 w-3 fill-current" />
            <span>{movie.imdbRating}</span>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium uppercase">
          {movie.Type}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-200">
          {movie.Title}
        </h3>
        
        <div className="flex items-center space-x-4 text-gray-400 text-sm">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{movie.Year}</span>
          </div>
          {movie.Runtime && movie.Runtime !== 'N/A' && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{movie.Runtime}</span>
            </div>
          )}
        </div>

        {movie.Genre && movie.Genre !== 'N/A' && (
          <div className="mt-3 flex flex-wrap gap-1">
            {movie.Genre.split(', ').slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};