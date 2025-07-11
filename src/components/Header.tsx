import React from 'react';
import { Search, Menu, User, Bell } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, currentPage, onPageChange }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Movies App
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => onPageChange('home')}
                className={`transition-colors duration-200 ${
                  currentPage === 'home' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => onPageChange('movies')}
                className={`transition-colors duration-200 ${
                  currentPage === 'movies' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Movies
              </button>
              <button 
                onClick={() => onPageChange('tvshows')}
                className={`transition-colors duration-200 ${
                  currentPage === 'tvshows' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                TV Shows
              </button>
              <button 
                onClick={() => onPageChange('newsletter')}
                className={`transition-colors duration-200 ${
                  currentPage === 'newsletter' ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                Newsletter
              </button>
            </nav>
          </div>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 w-64"
              />
            </div>
            
            <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            <User className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            <Menu className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition-colors md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
};