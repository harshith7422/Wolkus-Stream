import React, { useState } from 'react';
import { X, Lock, Globe, Save } from 'lucide-react';
import type { MovieList, Movie } from '../types/Movie';

interface ListManagerProps {
  onClose: () => void;
  onSave: (name: string, description: string, isPrivate: boolean) => void;
  onAddToExisting: (listId: string, movie: Movie) => void;
  existingLists: MovieList[];
  editingList?: MovieList | null;
  selectedMovie?: Movie | null;
}

export const ListManager: React.FC<ListManagerProps> = ({
  onClose,
  onSave,
  onAddToExisting,
  existingLists,
  editingList,
  selectedMovie,
}) => {
  const [tab, setTab] = useState<'create' | 'existing'>(selectedMovie ? 'existing' : 'create');
  const [name, setName] = useState(editingList?.name || '');
  const [description, setDescription] = useState(editingList?.description || '');
  const [isPrivate, setIsPrivate] = useState(editingList?.isPrivate ?? true);
  const [errors, setErrors] = useState<{ name?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'List name is required';
    } else if (name.length > 50) {
      newErrors.name = 'List name must be 50 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(name.trim(), description.trim(), isPrivate);
    }
  };

  const handleAddToList = (listId: string) => {
    if (selectedMovie) {
      onAddToExisting(listId, selectedMovie);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">
            {selectedMovie 
              ? `Add "${selectedMovie.Title}" to List`
              : editingList 
                ? 'Edit List' 
                : 'Create New List'
            }
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs (only show if adding to movie) */}
        {selectedMovie && (
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setTab('existing')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                tab === 'existing'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Add to Existing List
            </button>
            <button
              onClick={() => setTab('create')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                tab === 'create'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Create New List
            </button>
          </div>
        )}

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {tab === 'existing' && selectedMovie ? (
            // Existing Lists Tab
            <div className="space-y-3">
              {existingLists.length > 0 ? (
                existingLists.map((list) => {
                  const movieAlreadyInList = list.movies.some(m => m.imdbID === selectedMovie.imdbID);
                  
                  return (
                    <button
                      key={list.id}
                      onClick={() => !movieAlreadyInList && handleAddToList(list.id)}
                      disabled={movieAlreadyInList}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                        movieAlreadyInList
                          ? 'bg-gray-800/50 border-gray-700 cursor-not-allowed opacity-50'
                          : 'bg-gray-800/50 border-gray-700 hover:border-purple-500 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white">{list.name}</h3>
                        <div className="flex items-center space-x-2">
                          {list.isPrivate ? (
                            <Lock className="h-4 w-4 text-red-400" />
                          ) : (
                            <Globe className="h-4 w-4 text-green-400" />
                          )}
                          {movieAlreadyInList && (
                            <span className="text-xs bg-yellow-600/20 text-yellow-400 px-2 py-1 rounded-full">
                              Already Added
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {list.description && (
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                          {list.description}
                        </p>
                      )}
                      
                      <p className="text-gray-500 text-xs">
                        {list.movies.length} {list.movies.length === 1 ? 'movie' : 'movies'}
                      </p>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No lists found</p>
                  <button
                    onClick={() => setTab('create')}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                  >
                    Create your first list
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Create/Edit List Tab
            <div className="space-y-6">
              {/* List Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  List Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  placeholder="e.g. My Favorite Action Movies"
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  }`}
                  maxLength={50}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  {name.length}/50 characters
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of this list (optional)"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  maxLength={200}
                />
                <p className="text-gray-500 text-xs mt-1">
                  {description.length}/200 characters
                </p>
              </div>

              {/* Privacy Setting */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Privacy Setting
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={isPrivate}
                      onChange={() => setIsPrivate(true)}
                      className="text-purple-600 focus:ring-purple-500 focus:ring-2"
                    />
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-red-400" />
                      <div>
                        <span className="text-white font-medium">Private</span>
                        <p className="text-gray-400 text-xs">Only you can see this list</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={!isPrivate}
                      onChange={() => setIsPrivate(false)}
                      className="text-purple-600 focus:ring-purple-500 focus:ring-2"
                    />
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-green-400" />
                      <div>
                        <span className="text-white font-medium">Public</span>
                        <p className="text-gray-400 text-xs">Anyone can view this list</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {tab === 'create' && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-800">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{editingList ? 'Update List' : 'Create List'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};