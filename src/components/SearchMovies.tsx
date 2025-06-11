import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import type { Movie } from '../types/Movie';
import { searchMovies } from '../utils/omdb';
import { MovieCard } from './MovieCard';

interface SearchMoviesProps {
  onViewDetails: (movie: Movie) => void;
  onAddToList: (movie: Movie) => void;
}

export const SearchMovies: React.FC<SearchMoviesProps> = ({
  onViewDetails,
  onAddToList,
}) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    type: '' as '' | 'movie' | 'series' | 'episode',
  });
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSearch = async (page = 1, resetResults = true) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = {
        query: query.trim(),
        page,
        ...(filters.year && { year: filters.year }),
        ...(filters.type && { type: filters.type }),
      };

      const data = await searchMovies(params);
      
      if (resetResults) {
        setMovies(data.Search || []);
        setCurrentPage(1);
      } else {
        setMovies(prev => [...prev, ...(data.Search || [])]);
      }
      
      setTotalResults(parseInt(data.totalResults) || 0);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      if (resetResults) {
        setMovies([]);
        setTotalResults(0);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && movies.length < totalResults) {
      handleSearch(currentPage + 1, false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setMovies([]);
    setError(null);
    setTotalResults(0);
    setCurrentPage(1);
    setHasSearched(false);
    searchInputRef.current?.focus();
  };

  const clearFilters = () => {
    setFilters({ year: '', type: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(1, true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Discover Movies & TV Shows
        </h2>
        <p className="text-gray-400">
          Search through millions of titles to find your next favorite
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="max-w-2xl mx-auto">
          {/* Search Input */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies, TV shows, actors..."
              className="w-full pl-12 pr-12 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Search Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                showFilters || filters.year || filters.type
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            {hasSearched && (
              <button
                type="button"
                onClick={clearSearch}
                className="px-6 py-3 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={filters.year}
                    onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                    placeholder="e.g. 2023"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="movie">Movies</option>
                    <option value="series">TV Series</option>
                    <option value="episode">Episodes</option>
                  </select>
                </div>
              </div>
              {(filters.year || filters.type) && (
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* Results Info */}
      {hasSearched && !loading && !error && (
        <div className="mb-6 text-center">
          <p className="text-gray-400">
            {totalResults > 0 
              ? `Found ${totalResults.toLocaleString()} results for "${query}"`
              : `No results found for "${query}"`
            }
          </p>
        </div>
      )}

      {/* Results Grid */}
      {movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onViewDetails={onViewDetails}
              onAddToList={onAddToList}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {movies.length > 0 && movies.length < totalResults && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Load More ({movies.length} of {totalResults.toLocaleString()})</span>
            )}
          </button>
        </div>
      )}

      {/* Empty State */}
      {hasSearched && movies.length === 0 && !loading && !error && (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No results found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={clearSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          >
            Start New Search
          </button>
        </div>
      )}
    </div>
  );
};