import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const { movies, pageName = '' } = props;

  return (
    <section className="movies-cards">
      <div className="movies-cards__wrapper">
        <ul className="movies-cards__list">
          {movies.map(movie => (
            <li key={movie.id}>
              <MoviesCard
                movie={movie}
                pageName={pageName}
              />
            </li>
          ))}
        </ul>
        <button className="movies-cards__more-button">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;