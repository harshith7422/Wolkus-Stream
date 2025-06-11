import React, { useState, useEffect } from 'react';
import { 
  X, Star, Calendar, Clock, Globe, Award, DollarSign, 
  Users, Film, Plus, ArrowLeft 
} from 'lucide-react';
import type { Movie } from '../types/Movie';
import { getMovieDetails } from '../utils/omdb';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  onAddToList: (movie: Movie) => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie: initialMovie,
  onClose,
  onAddToList,
}) => {
  const [movie, setMovie] = useState<Movie>(initialMovie);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFullDetails = async () => {
      if (!initialMovie.Plot || initialMovie.Plot === 'N/A') {
        setLoading(true);
        setError(null);
        try {
          const fullMovie = await getMovieDetails(initialMovie.imdbID);
          setMovie(fullMovie);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load details');
          console.error('Error fetching movie details:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFullDetails();
  }, [initialMovie]);

  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop`;

  const detailItems = [
    { label: 'Director', value: movie.Director, icon: Film },
    { label: 'Actors', value: movie.Actors, icon: Users },
    { label: 'Released', value: movie.Released, icon: Calendar },
    { label: 'Runtime', value: movie.Runtime, icon: Clock },
    { label: 'Language', value: movie.Language, icon: Globe },
    { label: 'Country', value: movie.Country, icon: Globe },
    { label: 'Box Office', value: movie.BoxOffice, icon: DollarSign },
    { label: 'Awards', value: movie.Awards, icon: Award },
  ].filter(item => item.value && item.value !== 'N/A');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <button
            onClick={() => onAddToList(movie)}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Add to List</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-300">Error loading details: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Poster */}
              <div className="lg:col-span-1">
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={posterUrl}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500&h=750&fit=crop`;
                    }}
                  />
                  
                  {/* Ratings */}
                  <div className="absolute top-4 right-4 space-y-2">
                    {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                      <div className="bg-yellow-500/90 backdrop-blur-sm text-black px-3 py-2 rounded-lg flex items-center space-x-1 font-semibold">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{movie.imdbRating}</span>
                      </div>
                    )}
                    {movie.Metascore && movie.Metascore !== 'N/A' && (
                      <div className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-semibold">
                        Meta: {movie.Metascore}
                      </div>
                    )}
                  </div>

                  {/* Type & Rating */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium uppercase">
                      {movie.Type}
                    </div>
                    {movie.Rated && movie.Rated !== 'N/A' && (
                      <div className="bg-gray-800/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium">
                        {movie.Rated}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title and Year */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {movie.Title}
                  </h1>
                  <p className="text-xl text-gray-400">{movie.Year}</p>
                </div>

                {/* Genres */}
                {movie.Genre && movie.Genre !== 'N/A' && (
                  <div className="flex flex-wrap gap-2">
                    {movie.Genre.split(', ').map((genre, index) => (
                      <span
                        key={index}
                        className="bg-purple-600/20 text-purple-300 border border-purple-600/30 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                {/* Plot */}
                {movie.Plot && movie.Plot !== 'N/A' && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Plot</h3>
                    <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
                  </div>
                )}

                {/* Details Grid */}
                {detailItems.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {detailItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50"
                          >
                            <div className="flex items-start space-x-3">
                              <Icon className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-400 mb-1">
                                  {item.label}
                                </p>
                                <p className="text-white text-sm leading-relaxed break-words">
                                  {item.value}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};