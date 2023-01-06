import './SearchForm.css';
import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useFormHook.js';
import cn from 'classnames';

function SearchForm(props) {

  const { onClick, pageName, onCheck, disableForm } = props;
  const { values, handleChange, setValues } = useForm();

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [shortMovies, setShortMovies] = useState(false);

  const handelSearchButtonClick = (evt) => {
    evt.preventDefault();
    if (!values.movie) {
      setShowErrorMessage(true);
      return;
    }
    onClick({ ...values, shortMovies });
  };

  const handelInputChange = (evt) => {
    setShowErrorMessage(false);
    handleChange(evt);
  };

  const handelCheckboxChange = () => {
    onCheck(!shortMovies, pageName);
    setShortMovies(!shortMovies)
  };

  useEffect(() => {
    const filterJson = localStorage.getItem(`${pageName}Filter`);
    if (filterJson) {
      const filter = JSON.parse(filterJson);
      setValues({ movie: filter.movie });
      setShortMovies(filter.shortMovies);
    }
  }, []);

  return (
    <section className="search-form">
      <div className="search-form__wrapper">
        <form className="search-form__form" name="search-form" action="#" noValidate onSubmit={handelSearchButtonClick}>
          <div className="search-form__fields">
            <span className={cn('search-form__error-message', { 'search-form__error-message_active': showErrorMessage })}>Нужно ввести ключевое слово</span>
            <input
              className="search-form__text"
              id="movie"
              name="movie"
              required
              placeholder="Фильм"
              onChange={handelInputChange}
              value={values.movie || ''}
              disabled={disableForm}
            />
            <label htmlFor="movie" className="search-form__text-label"></label>
            <button className="search-form__button" type="submit" disabled={disableForm}></button>
          </div>
          <label htmlFor="short" className="search-form__short-movies">
            <input
              className="search-form__checkbox"
              type="checkbox"
              id="short"
              name="short"
              checked={shortMovies}
              onChange={handelCheckboxChange}
              disabled={disableForm}
            />
            <span className="search-form__checkbox-label">Короткометражки</span>
          </label>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;