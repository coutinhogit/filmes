import { useState, useEffect } from 'react';
import api from './api';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import MovieCard from './components/MovieCard';
import Modal from './components/Modal';
import Filters from './components/Filters'; 

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const fetchMovies = async (filters = {}) => {
    setLoading(true);
    try {
      
      const params = new URLSearchParams();

      if (filters.search) params.append('series_title', filters.search);
      if (filters.genre) params.append('genre', filters.genre);
      if (filters.rating) params.append('imdb_rating_gt', filters.rating);

      const response = await api.get(`/movies?${params.toString()}`);
      setMovies(response.data);
    } catch (error) {
      console.error(error);
      setMovies([]); 
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchMovies();
  }, []);

 
  const handleFilterSubmit = (filterValues) => {
    fetchMovies(filterValues);
  };

  const handleOpenModal = async (movieId) => {
    try {
      const response = await api.get(`/movies/${movieId}`);
      setSelectedMovie(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <h2 className="section-title">Catálogo Completo</h2>

      
        <Filters onFilter={handleFilterSubmit} />

        {loading ? (
          <p className="loading-text">Carregando catálogo...</p>
        ) : (
          <>
            {movies.length === 0 ? (
              <p className="no-results" style={{ textAlign: 'center', marginTop: '20px' }}>
                Nenhum filme encontrado.
              </p>
            ) : (
              <div className="movie-grid">
                {movies.map((movie, index) => {
                  
                  const movieId = movie.id || (index + 1);
                  return (
                    <MovieCard 
                      key={movieId} 
                      movie={movie} 
                      onClick={() => handleOpenModal(movieId)} 
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>

      {isModalOpen && (
        <Modal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Footer />
    </div>
  );
}

export default App;