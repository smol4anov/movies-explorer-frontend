import './Header.css';
import { Link } from "react-router-dom";
import cn from 'classnames';

const Header = (props) => {
  const { pageName, onClick } = props;
  return (
    <header className={cn('header', { 'header_main-page': pageName === "Main" })}>
      <div className="header__wrapper">
        <Link to="/" className="header__logo" ></Link>
        {pageName === "Main" ? <>
          <div className="header__main-button">
            <Link to="/signup" className="header__signup" >Регистрация</Link>
            <Link to="/signin" className="header__signin" >Войти</Link>
          </div>
        </> : <>
          <nav className="header__movies-links">
            <Link to="/movies" className={cn('header__link', { 'header__link_active': pageName === "Movies" })} >Фильмы</Link>
            <Link to="/saved-movies" className={cn('header__link', { 'header__link_active': pageName === "SavedMovies" })} >Сохранённые фильмы</Link>
          </nav>
          <nav className="header__acсount-links">
            <Link to="/profile" className="header__account" >Аккаунт</Link>
            <Link to="/profile" className="header__account-image" ></Link>
          </nav>
          <button className="header__burger" onClick={onClick}>
            <span className="header__burger-decor"></span>
            <span className="header__burger-decor"></span>
            <span className="header__burger-decor"></span>
          </button>
        </>}
      </div>
    </header>
  );
}

export default Header;