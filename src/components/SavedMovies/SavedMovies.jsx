import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {

  return (
    <section className="saved-movies">
      <SearchForm {...props} />
      <MoviesCardList {...props} />
    </section>
  );
}

export default SavedMovies;