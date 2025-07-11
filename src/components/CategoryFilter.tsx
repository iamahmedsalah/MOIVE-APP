import React from 'react';
import { Genre } from '../types/movie';

interface CategoryFilterProps {
  genres: Genre[];
  selectedGenre: string;
  onGenreSelect: (genreId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  genres,
  selectedGenre,
  onGenreSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreSelect(genre.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedGenre === genre.id
              ? 'bg-red-600 text-white shadow-lg scale-105'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};