import './MoviesCard.css';
import cn from 'classnames';

function MoviesCard(props) {

  const { movie, pageName = '' } = props;

  return (
    <div className="movies-card">
      <img src={movie.image} alt={movie.nameRU} className="movie__image" />
      <div className="movie__content">
        <div className="movie__content-title">
          <h3 className="movie__title">{movie.nameRU}</h3>
          <button type="button" className={cn('movie__save-button', { 'movie__save-button_delete': pageName === "SavedMovies" })} ></button>
        </div>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;