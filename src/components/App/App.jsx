import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

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
import { githubUrl, practicumUrl, staticUrl, adaptiveUrl, spaUrl, movies, savedMovies } from '../../utils/constants.js';


function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleBurgerMenuClick = () => {
    setIsMenuOpen(true);
  };

  const mainProps = {
    githubLink: githubUrl,
    practicumLink: practicumUrl,
    staticLink: staticUrl,
    adaptiveLink: adaptiveUrl,
    spaLink: spaUrl,
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Header pageName="Main" />
            <Main {...mainProps} />
            <Footer {...mainProps} />
          </>
        } />
        <Route path="/movies" element={
          <>
            <Header pageName="Movies" onClick={handleBurgerMenuClick} />
            <Movies movies={movies} />
            <Footer {...mainProps} />
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Header pageName="SavedMovies" onClick={handleBurgerMenuClick} />
            <SavedMovies movies={savedMovies} />
            <Footer {...mainProps} />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Header onClick={handleBurgerMenuClick} />
            <Profile />
          </>
        } />
        <Route path="/signup" element={
          <Register />
        } />
        <Route path="/signin" element={
          <Login />
        } />
        <Route path="*" element={
          <NotFoundPage />
        }
        />
      </Routes>
      <Navigation isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
}

export default App;
