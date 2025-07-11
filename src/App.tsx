import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MovieGrid } from './components/MovieGrid';
import { CategoryFilter } from './components/CategoryFilter';
import { MovieModal } from './components/MovieModal';
import { Newsletter } from './components/Newsletter';
import { MoviesPage } from './components/MoviesPage';
import { TVShowsPage } from './components/TVShowsPage';
import { Footer } from './components/Footer';
import { movies, genres } from './data/movies';
import { Movie } from './types/movie';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [heroMovieIndex, setHeroMovieIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  // Auto-rotate hero movies
  useEffect(() => {
    const featuredMovies = movies.filter(movie => movie.featured);
    const interval = setInterval(() => {
      setHeroMovieIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Filter movies based on search and genre
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGenre = selectedGenre === 'all' || movie.genre.includes(selectedGenre);
    
    return matchesSearch && matchesGenre;
  });

  const featuredMovies = movies.filter(movie => movie.featured);
  const currentHeroMovie = featuredMovies[heroMovieIndex] || featuredMovies[0];

  if (currentPage === 'newsletter') {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <Newsletter />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'movies') {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <MoviesPage 
          movies={movies}
          onMovieSelect={setSelectedMovie}
          searchQuery={searchQuery}
        />
        <Footer />
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    );
  }

  if (currentPage === 'tvshows') {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <TVShowsPage searchQuery={searchQuery} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <main className="pt-16">
        <Hero 
          movie={currentHeroMovie}
          onMovieSelect={setSelectedMovie}
        />
        
        <section className="py-12 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <h2 className="text-3xl font-bold text-white mb-4 sm:mb-0">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Movies'}
              </h2>
              <CategoryFilter
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreSelect={setSelectedGenre}
              />
            </div>
            
            <MovieGrid
              movies={filteredMovies}
              onMovieSelect={setSelectedMovie}
            />
          </div>
        </section>
      </main>

      <Footer />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;