import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieSelect }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-xl mb-4">No movies found</div>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieSelect={onMovieSelect}
        />
      ))}
    </div>
  );
};