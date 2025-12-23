import { useState } from 'react';
import '../styles/Filters.css'

const Filters = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ search, genre, rating });
  };

  return (
    <div className="filters-container">
      <form className="filters-form" onSubmit={handleSubmit}>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Pesquisar nome do filme..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <select value={genre} onChange={(e) => setGenre(e.target.value)} className="custom-select">
            <option value="">Todos os Gêneros</option>
            <option value="Drama">Drama</option>
            <option value="Action">Ação</option>
            <option value="Crime">Crime</option>
            <option value="Comedy">Comédia</option>
            <option value="Adventure">Aventura</option>
          </select>
          <select value={rating} onChange={(e) => setRating(e.target.value)} className="custom-select">
            <option value="">Todas as Notas</option>
            <option value="9">⭐ 9.0+</option>
            <option value="8">⭐ 8.0+</option>
          </select>
          <button type="submit" className="btn-filter">Buscar</button>
        </div>
      </form>
    </div>
  );
};

export default Filters;