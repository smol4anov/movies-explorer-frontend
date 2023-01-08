import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {

  return (
    <section className="movies">
      <SearchForm {...props} />
      <MoviesCardList {...props} />
    </section>
  );
}

export default Movies;