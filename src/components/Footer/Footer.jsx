import './Footer.css';

const Footer = (props) => {

  const { githubLink, practicumLink } = props;

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__content">
          <p className="footer__copy">&copy; 2022</p>
          <nav className="footer__links">
            <a href={practicumLink} target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
            <a href={githubLink} target="_blank" rel="noreferrer" className="footer__link">Github</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;