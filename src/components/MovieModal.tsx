import React, { useEffect } from 'react';
import { X, Play, Star, Clock, Calendar, User } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header with backdrop */}
        <div className="relative h-64 sm:h-80">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Movie poster and basic info */}
          <div className="absolute bottom-4 left-4 flex items-end space-x-4">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-24 h-36 sm:w-32 sm:h-48 object-cover rounded-lg shadow-lg"
            />
            <div className="text-white pb-2">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{movie.title}</h2>
              <div className="flex items-center space-x-4 text-sm sm:text-base">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{movie.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {/* Action buttons */}
          <div className="flex space-x-4 mb-6">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors duration-200">
              <Play className="w-5 h-5" />
              <span>Play</span>
            </button>
            <button className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200">
              + My List
            </button>
          </div>

          {/* Genres */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
          </div>

          {/* Cast and Director */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Director</span>
              </h3>
              <p className="text-gray-300">{movie.director}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Cast</h3>
              <div className="space-y-1">
                {movie.cast.map((actor, index) => (
                  <p key={index} className="text-gray-300 text-sm">
                    {actor}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};