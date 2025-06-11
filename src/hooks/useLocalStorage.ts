import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useMovieLists() {
  const [lists, setLists] = useLocalStorage<import('../types/Movie').MovieList[]>('movieLists', []);

  const addList = (name: string, description: string, isPrivate: boolean) => {
    const newList = {
      id: crypto.randomUUID(),
      name,
      description,
      movies: [],
      isPrivate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLists(prev => [...prev, newList]);
    return newList;
  };

  const updateList = (listId: string, updates: Partial<import('../types/Movie').MovieList>) => {
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, ...updates, updatedAt: new Date().toISOString() }
        : list
    ));
  };

  const deleteList = (listId: string) => {
    setLists(prev => prev.filter(list => list.id !== listId));
  };

  const addMovieToList = (listId: string, movie: import('../types/Movie').Movie) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        // Check if movie already exists in the list
        const movieExists = list.movies.some(m => m.imdbID === movie.imdbID);
        if (!movieExists) {
          return {
            ...list,
            movies: [...list.movies, movie],
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return list;
    }));
  };

  const removeMovieFromList = (listId: string, movieId: string) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          movies: list.movies.filter(movie => movie.imdbID !== movieId),
          updatedAt: new Date().toISOString(),
        };
      }
      return list;
    }));
  };

  return {
    lists,
    addList,
    updateList,
    deleteList,
    addMovieToList,
    removeMovieFromList,
  };
}