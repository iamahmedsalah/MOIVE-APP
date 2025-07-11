import React, { useState } from 'react';
import { MovieGrid } from './MovieGrid';
import { CategoryFilter } from './CategoryFilter';
import { Movie } from '../types/movie';
import { genres } from '../data/movies';
import { Film, TrendingUp, Calendar, Star } from 'lucide-react';

interface MoviesPageProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
  searchQuery: string;
}

export const MoviesPage: React.FC<MoviesPageProps> = ({ movies, onMovieSelect, searchQuery }) => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');

  // Filter movies based on search and genre
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGenre = selectedGenre === 'all' || movie.genre.includes(selectedGenre);
    
    return matchesSearch && matchesGenre;
  });

  // Sort movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'year':
        return b.year - a.year;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const featuredMovies = movies.filter(movie => movie.featured);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-500/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <Film className="absolute top-1/3 right-10 w-16 h-16 text-white/5 animate-spin" style={{ animationDuration: '20s' }} />
      </div>

      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent mb-6">
              Movies Collection
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover an extensive collection of blockbuster movies, indie films, and timeless classics. From action-packed adventures to heartwarming dramas.
            </p>
          </div>

          {/* Featured Movies */}
          <section className="mb-16">
            <div className="flex items-center space-x-2 mb-8">
              <TrendingUp className="w-6 h-6 text-red-500" />
              <h2 className="text-3xl font-bold text-white">Featured Movies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMovies.slice(0, 3).map((movie) => (
                <div
                  key={movie.id}
                  className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => onMovieSelect(movie)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.backdrop}
                      alt={movie.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{movie.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-2">{movie.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{movie.description}</p>
                    <div className="flex items-center justify-between text-gray-400 text-sm">
                      <span>{movie.year}</span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <h2 className="text-3xl font-bold text-white">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Movies'}
              </h2>
              <span className="text-gray-400">({sortedMovies.length} movies)</span>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="rating">Rating</option>
                  <option value="year">Year</option>
                  <option value="title">Title</option>
                </select>
              </div>
              
              {/* Genre Filter */}
              <CategoryFilter
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreSelect={setSelectedGenre}
              />
            </div>
          </div>

          {/* Movies Grid */}
          <MovieGrid
            movies={sortedMovies}
            onMovieSelect={onMovieSelect}
          />
        </div>
      </div>
    </div>
  );
};