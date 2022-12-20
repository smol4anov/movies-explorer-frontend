import './Navigation.css';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import cn from 'classnames';

const Navigation = (props) => {

  const { isOpen, onClose } = props;

  const handleEscClose = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    else {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isOpen]);

  return (
    <div className={cn('navigation', { 'navigation_opened': isOpen })} onMouseDown={handleMouseDown}>
      <nav className="navigation__links">
        <Link to="/" className="navigation__link" onClick={onClose}>Главная</Link>
        <Link to="/movies" className="navigation__link" onClick={onClose}>Фильмы</Link>
        <Link to="/saved-movies" className="navigation__link" onClick={onClose}>Сохранённые фильмы</Link>
        <Link to="/profile" className="navigation__account" onClick={onClose}>Аккаунт</Link>
      </nav>
      <button className="navigation__close" onClick={onClose}></button>
    </div>
  );
}

export default Navigation;