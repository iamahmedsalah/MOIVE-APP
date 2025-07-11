import React from 'react';
import { Play, Star, Clock } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onMovieSelect: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onMovieSelect }) => {
  return (
    <div 
      className="group relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={() => onMovieSelect(movie)}
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200">
            <Play className="w-6 h-6" />
          </button>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{movie.rating}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
        
        <div className="flex items-center justify-between text-gray-400 text-sm mb-3">
          <span>{movie.year}</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{movie.duration}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((genre) => (
            <span key={genre} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
              {genre}
            </span>
          ))}
        </div>

        <p className="text-gray-300 text-sm line-clamp-3">{movie.description}</p>
      </div>
    </div>
  );
};