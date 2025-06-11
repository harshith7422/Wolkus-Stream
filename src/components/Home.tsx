import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Film, Search, ArrowRight } from 'lucide-react';
import type { Movie } from '../types/Movie';
import { getPopularMovies } from '../utils/omdb';
import { MovieCard } from './MovieCard';

interface HomeProps {
  onViewDetails: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
  onNavigateToSearch: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onViewDetails,
  onAddToList,
  onNavigateToSearch,
}) => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch multiple popular searches to get a diverse selection
        const searches = ['marvel', 'star wars', 'batman', 'pixar'];
        const allMovies: Movie[] = [];

        for (const search of searches) {
          try {
            const data = await getPopularMovies();
            if (data.Search) {
              allMovies.push(...data.Search.slice(0, 6));
            }
          } catch (err) {
            console.error(`Error fetching ${search} movies:`, err);
          }
        }

        // Remove duplicates and limit to 24 movies
        const uniqueMovies = allMovies.filter((movie, index, self) =>
          index === self.findIndex(m => m.imdbID === movie.imdbID)
        ).slice(0, 24);

        setFeaturedMovies(uniqueMovies);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load featured movies');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMovies();
  }, []);

  const categories = [
    {
      title: 'Popular Movies',
      icon: TrendingUp,
      description: 'Trending titles everyone is watching',
      movies: featuredMovies.slice(0, 8),
    },
    {
      title: 'Recently Added',
      icon: Star,
      description: 'Fresh content just added to our collection',
      movies: featuredMovies.slice(8, 16),
    },
    {
      title: 'Staff Picks',
      icon: Film,
      description: 'Curated selections from our team',
      movies: featuredMovies.slice(16, 24),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative py-16 lg:py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-3xl" />
        <div className="relative">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Wolkus Stream
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover, organize, and share your favorite movies and TV shows.
            Create custom lists and never lose track of what to watch next.
          </p>
          <button
            onClick={onNavigateToSearch}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3 mx-auto"
          >
            <Search className="h-5 w-5" />
            <span>Start Exploring</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
          <p className="text-center text-gray-400 mt-4">Loading featured movies...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="py-16">
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-300 text-center">{error}</p>
          </div>
        </div>
      )}

      {/* Featured Categories */}
      {!loading && !error && featuredMovies.length > 0 && (
        <div className="py-8 space-y-12">
          {categories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <section key={categoryIndex}>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                      <p className="text-gray-400 text-sm">{category.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={onNavigateToSearch}
                    className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                  >
                    <span>View All</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Movies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 lg:gap-6">
                  {category.movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onViewDetails={onViewDetails}
                      onAddToList={onAddToList}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Features Section */}
      <div className="py-16 border-t border-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Wolkus Stream?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage and discover your favorite entertainment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <div className="bg-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
              <Search className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Powerful Search</h3>
            <p className="text-gray-400">
              Find any movie or TV show with our comprehensive search powered by OMDB
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <div className="bg-blue-600 p-3 rounded-full w-fit mx-auto mb-4">
              <Film className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Custom Lists</h3>
            <p className="text-gray-400">
              Create public and private lists to organize your favorites and share with friends
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <div className="bg-green-600 p-3 rounded-full w-fit mx-auto mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Rich Details</h3>
            <p className="text-gray-400">
              Get comprehensive information including ratings, cast, plot, and more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};