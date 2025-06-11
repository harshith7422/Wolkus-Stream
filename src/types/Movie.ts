export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  Runtime?: string;
  imdbRating?: string;
  Released?: string;
  Writer?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Rated?: string;
  Metascore?: string;
  BoxOffice?: string;
}

export interface MovieList {
  id: string;
  name: string;
  description: string;
  movies: Movie[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetailResponse extends Movie {
  Response: string;
  Error?: string;
}