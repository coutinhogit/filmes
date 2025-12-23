import '../styles/Modal.css';

const Modal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h2>{movie.series_title}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="modal-info-row">
            <img src={movie.poster_link} alt={movie.series_title} className="modal-poster" />
            
            <div className="modal-details">
              <p><strong>Ano:</strong> {movie.released_year}</p>
              <p><strong>Gênero:</strong> {movie.genre}</p>
              <p><strong>Diretor:</strong> {movie.director}</p>
              <p><strong>Nota IMDB:</strong> ⭐ {movie.imdb_rating}</p>
              <p><strong>Duração:</strong> {movie.runtime}</p>
            </div>
          </div>

          <div className="synopsis">
            <h3>Sinopse</h3>
            <p>{movie.overview || "Sinopse indisponível."}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Modal;