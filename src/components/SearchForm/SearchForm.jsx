import './SearchForm.css';

function SearchForm(props) {

  return (
    <section className="search-form">
      <div className="search-form__wrapper">
        <form className="search-form__form" name="search-form" action="#" noValidate>
          <div className="search-form__fields">
            <input
              className="search-form__text"
              id="movies"
              name="movies"
              required
              placeholder="Фильм"
            />
            <label htmlFor="movies" className="search-form__text-label"></label>
            <button className="search-form__button" type="submit" ></button>
          </div>
          <label htmlFor="short-movies" className="search-form__short-movies">
            <input
              className="search-form__checkbox"
              type="checkbox"
              id="short-movies"
              name="short-movies"
            />
            <span className="search-form__checkbox-label">Короткометражки</span>
          </label>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;