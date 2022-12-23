import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {

  const newProps = { ...props, pageName: 'SavedMovies' };

  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList {...newProps} />
    </section>
  );
}

export default SavedMovies;