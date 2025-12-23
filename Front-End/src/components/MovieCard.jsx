import '../styles/MovieCard.css'

const MovieCard = ({ movie, onClick }) => {
  return (
    
    <div className="movie-card" onClick={() => onClick(movie.id)}>
      <img 
        src={movie.poster_link} 
        alt={movie.series_title} 
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.series_title}</h3>
        <p className="movie-details"><strong>Ano:</strong> {movie.released_year}</p>
        <p className="movie-details"><strong>Gênero:</strong> {movie.genre}</p>
        <p className="movie-details">⭐ {movie.imdb_rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;