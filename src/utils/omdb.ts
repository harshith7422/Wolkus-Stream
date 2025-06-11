const OMDB_API_KEY = '78ac80a0'; // Free tier API key for demo
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

export interface SearchParams {
  query: string;
  year?: string;
  type?: 'movie' | 'series' | 'episode';
  page?: number;
}

export const searchMovies = async (params: SearchParams) => {
  const { query, year, type, page = 1 } = params;
  
  if (!query.trim()) {
    throw new Error('Search query is required');
  }

  const searchParams = new URLSearchParams({
    apikey: OMDB_API_KEY,
    s: query.trim(),
    page: page.toString(),
  });

  if (year) searchParams.append('y', year);
  if (type) searchParams.append('type', type);

  try {
    const response = await fetch(`${OMDB_BASE_URL}?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Search failed');
    }
    
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (imdbID: string) => {
  if (!imdbID) {
    throw new Error('IMDb ID is required');
  }

  const searchParams = new URLSearchParams({
    apikey: OMDB_API_KEY,
    i: imdbID,
    plot: 'full',
  });

  try {
    const response = await fetch(`${OMDB_BASE_URL}?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getPopularMovies = async () => {
  const popularQueries = [
    'avengers', 'batman', 'star wars', 'harry potter', 'lord of the rings',
    'marvel', 'disney', 'pixar', 'james bond', 'fast furious'
  ];
  
  const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
  
  try {
    return await searchMovies({ query: randomQuery, page: 1 });
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    // Fallback to a simple search
    return await searchMovies({ query: 'movie', page: 1 });
  }
};