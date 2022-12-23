import './MoviesCard.css';
import cn from 'classnames';

function MoviesCard(props) {

  const { movie, pageName = '' } = props;

  return (
    <div className="movies-card">
      <img src={movie.image} alt={movie.nameRU} className="movies-card__image" />
      <div className="movies-card__content">
        <div className="movies-card__content-title">
          <h3 className="movies-card__title">{movie.nameRU}</h3>
          <button type="button" className={cn('movies-card__save-button', { 'movies-card__save-button_delete': pageName === "SavedMovies" })} ></button>
        </div>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;