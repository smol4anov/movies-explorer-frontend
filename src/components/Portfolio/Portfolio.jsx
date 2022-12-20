import './Portfolio.css';

function Portfolio(props) {
  const { staticLink, adaptiveLink, spaLink } = props;
  return (
    <section className="portfolio">
      <div className="portfolio__wrapper">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__links">
          <li className="portfolio__links-item">
            <a href={staticLink} target="_blanck" className="portfolio__link">
              <p className="portfolio__link-text">Статичный сайт</p>
              <div className="portfolio__link-arrou"></div>
            </a>
          </li>
          <li className="portfolio__links-item">
            <a href={adaptiveLink} target="_blanck" className="portfolio__link">
              <p className="portfolio__link-text">Адаптивный сайт</p>
              <div className="portfolio__link-arrou"></div>
            </a>
          </li>
          <li className="portfolio__links-item">
            <a href={spaLink} target="_blanck" className="portfolio__link">
              <p className="portfolio__link-text">Одностраничное приложение</p>
              <div className="portfolio__link-arrou"></div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;