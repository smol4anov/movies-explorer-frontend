import './MoviesCardList.css';
import { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import { moviesNotFoundMessage, moviesLoadingErrorMessage } from '../../utils/constants.js';

function MoviesCardList(props) {

  const { movies, pageName, showPreloader, showError, showNotFound, cardsAmount, onUnmount, onMountComponent, onMoreClick } = props;

  let moviesList = movies;
  if (cardsAmount) moviesList = moviesList.slice(0, cardsAmount.initalAmount);

  useEffect(() => {
    onMountComponent(pageName);
    return onUnmount;
  }, []);

  return (
    <section className="movies-cards">
      <div className="movies-cards__wrapper">
        {showPreloader ? <Preloader /> :
          showError ? <h2 className="movies-cards__error">{moviesLoadingErrorMessage}</h2> :
            showNotFound ? <h2 className="movies-cards__not-found">{moviesNotFoundMessage}</h2> :
              <>
                <ul className="movies-cards__list">
                  {moviesList.map(item => (
                    <li key={item._id}>
                      <MoviesCard
                        movie={item}
                        {...props}
                      />
                    </li>
                  ))}
                </ul>
                {(moviesList.length < movies.length) && <button className="movies-cards__more-button" onClick={onMoreClick}>Ещё</button>}
              </>
        }
      </div>
    </section>
  );
}

export default MoviesCardList;