import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList {...props} />
    </section>
  );
}

export default Movies;