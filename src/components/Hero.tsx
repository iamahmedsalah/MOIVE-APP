import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Movie } from '../types/movie';

interface HeroProps {
  movie: Movie;
  onMovieSelect: (movie: Movie) => void;
}

export const Hero: React.FC<HeroProps> = ({ movie, onMovieSelect }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold">{movie.rating}</span>
            </div>
            <span className="text-gray-300">{movie.year}</span>
            <span className="text-gray-300">{movie.duration}</span>
            <div className="flex space-x-2">
              {movie.genre.slice(0, 2).map((genre) => (
                <span key={genre} className="px-2 py-1 bg-gray-800/60 rounded text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            {movie.description}
          </p>

          <div className="flex space-x-4">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors duration-200">
              <Play className="w-5 h-5" />
              <span>Play</span>
            </button>
            <button 
              onClick={() => onMovieSelect(movie)}
              className="bg-gray-800/80 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-700 transition-colors duration-200"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};