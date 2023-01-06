import './MoviesCard.css';
import cn from 'classnames';

function MoviesCard(props) {

  const { movie, pageName, onEditCardLike, onDeleteCardLike } = props;

  const handleLikeButtonClick = (e) => {
    e.preventDefault();
    if (pageName === 'savedMovies') {
      onDeleteCardLike(movie._id, pageName);
      return;
    }
    if (!!movie.savedMovieId) {
      onDeleteCardLike(movie.savedMovieId, pageName);
      return;
    }
    onEditCardLike(movie);
  };

  return (
    <a href={movie.trailerLink} target="_blank" rel="noreferrer" className="movies-card" >
      <img src={movie.image} alt={movie.nameRU} className="movies-card__image" />
      <div className="movies-card__content">
        <div className="movies-card__content-title">
          <h3 className="movies-card__title">{movie.nameRU}</h3>
          <button type="button" onClick={handleLikeButtonClick} className={
            cn('movies-card__save-button',
              {
                'movies-card__save-button_delete': pageName === 'savedMovies',
                'movies-card__save-button_saved': !!movie.savedMovieId
              })} ></button>
        </div>
        <p className="movies-card__duration">{movie.durationMask}</p>
      </div>
    </a>
  );
}

export default MoviesCard;