export interface Movie {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  year: number;
  genre: string[];
  duration: string;
  description: string;
  cast: string[];
  director: string;
  trailer?: string;
  featured?: boolean;
}

export interface Genre {
  id: string;
  name: string;
}