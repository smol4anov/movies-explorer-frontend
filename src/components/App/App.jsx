import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import * as api from '../../utils/MainApi';
import { getBeatfilmMovies } from '../../utils/MoviesApi.js';

import {
  getLikedMovies,
  addDurationMask,
  filterByKeyWords,
  filterMovies,
  getMovieForSaving,
  setAdditionalFields,
  getCardsAmounts
} from '../../utils/utilityFunc';

import {
  githubUrl,
  practicumUrl,
  staticUrl,
  adaptiveUrl,
  spaUrl,
} from '../../utils/constants.js';

import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Navigation from '../Navigation/Navigation';
import ProtectedRoute from '../ProtectedRoute';


function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);

  const [showPreloader, setShowPreloader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [disableForm, setDisableForm] = useState(false);

  const [submitResult, setSubmitResult] = useState({ message: '', isError: false });
  const [cardsAmount, setCardsAmount] = useState({});

  const navigate = useNavigate();

  let timeOut = null;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleBurgerMenuClick = () => {
    setIsMenuOpen(true);
  };

  const getSavedMovies = () => {

    let savedMoviesList = localStorage.getItem('savedMoviesList');

    if (!savedMoviesList) return api.getMovies();

    savedMoviesList = JSON.parse(savedMoviesList);

    return Promise.resolve(savedMoviesList);
  };

  const setSavedMovies = (savedMovies) => {
    const savedMoviesList = localStorage.getItem('savedMoviesList');
    if (!savedMoviesList) {
      localStorage.setItem('savedMoviesList', JSON.stringify(savedMovies));
    }
  };

  const refreshMoviesList = (pageName) => {

    let moviesFilter = localStorage.getItem(`${pageName}Filter`);
    let moviesList = localStorage.getItem(`${pageName}List`);

    if (!moviesFilter || !moviesList) {
      setMovies([]);
      setShowNotFound(false);
      return
    };

    moviesList = JSON.parse(moviesList);
    moviesFilter = JSON.parse(moviesFilter);

    moviesList = filterMovies(moviesList, moviesFilter);
    setMovies(addDurationMask(moviesList));
    setShowNotFound(moviesList.length === 0);
  };

  const handleMoviesSearchButtonClick = (filterData) => {

    setDisableForm(true);

    if (showError) setShowError(false);

    setShowPreloader(true);
    setCardsAmount(getCardsAmounts());

    Promise.all([getBeatfilmMovies(), getSavedMovies()])
      .then(([beatfilmMovies, savedMovies]) => {

        let moviesList = filterByKeyWords(beatfilmMovies, filterData.movie);
        moviesList = setAdditionalFields(moviesList);
        moviesList = getLikedMovies(moviesList, savedMovies);

        localStorage.setItem('moviesList', JSON.stringify(moviesList));
        localStorage.setItem('moviesFilter', JSON.stringify(filterData));
        refreshMoviesList('movies');

        setSavedMovies(savedMovies);
      })
      .catch(() => setShowError(true))
      .finally(() => {
        setDisableForm(false);
        setShowPreloader(false);
      });
  };

  const handleUnmountComponent = () => {
    if (showError) setShowError(false);
    clearSubmitMessage();
  };

  const clearSubmitMessage = () => {
    if (submitResult.message) setSubmitResult({ message: '', isError: false });
  };

  const handleMountMoviesComponent = (pageName) => {
    refreshMoviesList(pageName);
  };

  const handelCheckboxChange = (shortMovies, pageName) => {
    let filterData = localStorage.getItem(`${pageName}Filter`);

    if (!filterData) return;

    filterData = JSON.parse(filterData);
    filterData = { ...filterData, shortMovies };
    localStorage.setItem(`${pageName}Filter`, JSON.stringify(filterData));
    refreshMoviesList(pageName);
  };

  const handleAddCardLike = (movie) => {
    api.createMovie(getMovieForSaving(movie))
      .then((newMovie) => {
        let savedMovies = localStorage.getItem('savedMoviesList');
        savedMovies = [...JSON.parse(savedMovies) || [], newMovie];
        localStorage.setItem('savedMoviesList', JSON.stringify(savedMovies));

        let moviesList = JSON.parse(localStorage.getItem('moviesList'));
        localStorage.setItem('moviesList', JSON.stringify(getLikedMovies(moviesList, savedMovies)));

        refreshMoviesList('movies');
      })
      .catch(() => setShowError(true));
  };

  const handleDeleteCardLike = (movieId, pageName) => {
    api.deleteMovie(movieId)
      .then(() => {
        let savedMovies = JSON.parse(localStorage.getItem('savedMoviesList'));
        savedMovies = savedMovies.filter((item) => item._id !== movieId);
        localStorage.setItem('savedMoviesList', JSON.stringify(savedMovies));

        let moviesList = JSON.parse(localStorage.getItem('moviesList'));
        localStorage.setItem('moviesList', JSON.stringify(getLikedMovies(moviesList, savedMovies)));

        refreshMoviesList(pageName);
      })
      .catch(() => setShowError(true));
  };

  const handleSavedMoviesSearchButtonClick = (filterData) => {

    setDisableForm(true);

    if (showError) setShowError(false);

    setShowPreloader(true);

    getSavedMovies()
      .then((savedMovies) => {

        const moviesList = filterByKeyWords(savedMovies, filterData.movie);
        localStorage.setItem('savedMoviesFilter', JSON.stringify(filterData));
        localStorage.setItem('savedMoviesList', JSON.stringify(moviesList));

        refreshMoviesList('savedMovies');

        setSavedMovies(savedMovies);
      })
      .catch(() => setShowError(true))
      .finally(() => {
        setDisableForm(false);
        setShowPreloader(false);
      });
  };

  const handleAuthorizationRequest = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
    navigate('/movies');
  };

  const handleRegisterButtonClick = (registerData) => {
    setDisableForm(true);
    api.register(registerData)
      .then(handleAuthorizationRequest)
      .catch(message => setSubmitResult({ message, isError: true }))
      .finally(() => setDisableForm(false));
  };

  const handleLoginButtonClick = (loginData) => {
    setDisableForm(true);
    api.login(loginData)
      .then(handleAuthorizationRequest)
      .catch(message => setSubmitResult({ message, isError: true }))
      .finally(() => setDisableForm(false));
  };

  const handleEditProfileButtonClick = (profileData) => {
    setDisableForm(true);
    api.editProfile(profileData)
      .then(user => {
        setCurrentUser(user);
        setSubmitResult({
          message: 'Данные успешно сохранены',
          isError: false
        })
      })
      .catch(message => setSubmitResult({ message, isError: true }))
      .finally(() => setDisableForm(false));
  };

  const handleExitClick = () => {
    api.logout()
      .then(() => {
        setCurrentUser({});
        setLoggedIn(false);
        navigate('/');
        localStorage.removeItem('moviesList');
        localStorage.removeItem('moviesFilter');
        localStorage.removeItem('savedMoviesFilter');
        localStorage.removeItem('savedMoviesList');
      })
      .catch(message => setSubmitResult({ message, isError: true }));
  };

  const handleMoreCardsClick = () => {
    setCardsAmount({
      ...cardsAmount,
      initalAmount: cardsAmount.initalAmount + cardsAmount.addAmount
    });
  };

  const handleScreenResize = () => {

    if (timeOut !== null) clearTimeout(timeOut);

    timeOut = setTimeout(() => setCardsAmount(getCardsAmounts()), 1000);
  };

  useEffect(() => {
    api.checkAuthorization()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch(err => {
        setCurrentUser({});
        setLoggedIn(false);
      });
    window.addEventListener('resize', handleScreenResize);
  }, []);

  const mainProps = {
    githubLink: githubUrl,
    practicumLink: practicumUrl,
    staticLink: staticUrl,
    adaptiveLink: adaptiveUrl,
    spaLink: spaUrl,
  };

  const commonProps = {
    movies,
    showPreloader,
    showError,
    showNotFound,
    disableForm,
    onDeleteCardLike: handleDeleteCardLike,
    onEditCardLike: handleAddCardLike,
    onUnmount: handleUnmountComponent,
    onMountComponent: handleMountMoviesComponent,
    onCheck: handelCheckboxChange,
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={
            <>
              <Header loggedIn={loggedIn} onClick={handleBurgerMenuClick} />
              <Main {...mainProps} />
              <Footer {...mainProps} />
            </>
          } />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header onClick={handleBurgerMenuClick} />
              <Movies
                {...commonProps}
                pageName={'movies'}
                cardsAmount={cardsAmount}
                onClick={handleMoviesSearchButtonClick}
                onMoreClick={handleMoreCardsClick}
              />
              <Footer {...mainProps} />
            </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header onClick={handleBurgerMenuClick} />
              <SavedMovies {...commonProps} pageName={'savedMovies'} onClick={handleSavedMoviesSearchButtonClick} />
              <Footer {...mainProps} />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header onClick={handleBurgerMenuClick} />
              <Profile
                disableForm={disableForm}
                submitResult={submitResult}
                onExit={handleExitClick}
                onSubmit={handleEditProfileButtonClick}
                onUnmount={handleUnmountComponent}
                clearSubmitMessage={clearSubmitMessage}
              />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Register
                disableForm={disableForm}
                submitMessage={submitResult.message}
                onRegister={handleRegisterButtonClick}
                onUnmount={handleUnmountComponent}
                clearSubmitMessage={clearSubmitMessage}
              />
            </ProtectedRoute>
          } />
          <Route path="/signin" element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Login
                disableForm={disableForm}
                submitMessage={submitResult.message}
                onLogin={handleLoginButtonClick}
                onUnmount={handleUnmountComponent}
                clearSubmitMessage={clearSubmitMessage}
              />
            </ProtectedRoute>
          } />
          <Route path="*" element={
            <NotFoundPage />
          }
          />
        </Routes>
        <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
