import { shortMoviesDuration, imageServer, moviesAmounts } from './constants.js';

const isShortmovies = movie => movie.duration <= shortMoviesDuration;

const getSavedMovieId = (savedMovies, movie) => savedMovies.find(item => item.movieId === movie.id)?._id;

const createDurationMask = (movie) => {
  let hours = Math.floor(movie.duration / 60);
  hours = hours ? `${hours}ч` : '';
  let minutes = movie.duration % 60;
  minutes = minutes ? `${minutes.toString().padStart(2, '0')}м` : '';

  return `${hours}${minutes}`;
}

export const filterByKeyWords = (movies, keyWords) => {
  return movies
    .filter(item => item.nameRU.toLowerCase().includes(keyWords.toLowerCase()));
};

export const filterMovies = (movies, filter) => {
  return movies
    .filter(item => item.nameRU.toLowerCase().includes(filter.movie.toLowerCase()) &&
      (filter.shortMovies ? isShortmovies(item) : !isShortmovies(item)));
};

export const setAdditionalFields = (movies) => {
  return movies.map(item => {
    return {
      ...item,
      _id: item.id,
      image: `${imageServer}${item.image.url}`,
      thumbnail: `${imageServer}${item.image.formats.thumbnail.url}`
    };
  });
};

export const getLikedMovies = (movies, savedMovies) => {
  return movies.map(item => {
    return { ...item, savedMovieId: getSavedMovieId(savedMovies, item) };
  });
};

export const addDurationMask = (movies) => {
  return movies.map(item => {
    return { ...item, durationMask: createDurationMask(item) };
  });
};

export const getCardsAmounts = () => {
  const windowInnerWidth = window.innerWidth;

  if (windowInnerWidth >= 1280) return moviesAmounts.max;
  if (windowInnerWidth >= 1024) return moviesAmounts.large;
  if (windowInnerWidth >= 768) return moviesAmounts.medium;
  return moviesAmounts.min;
};

export const getMovieForSaving = (movies) => {
  return {
    country: movies.country,
    director: movies.director,
    duration: movies.duration,
    year: movies.year,
    description: movies.description,
    image: movies.image,
    trailerLink: movies.trailerLink,
    thumbnail: movies.thumbnail,
    movieId: movies.id,
    nameRU: movies.nameRU,
    nameEN: movies.nameEN
  };
};