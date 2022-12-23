import './Techs.css';

function Techs() {
  return (
    <section id="techs" className="techs">
      <div className="techs__wrapper">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__content">
          <h3 className="techs__content-title">7 технологий</h3>
          <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className="techs__tags">
            <li className="techs__tag">HTML</li>
            <li className="techs__tag">CSS</li>
            <li className="techs__tag">JS</li>
            <li className="techs__tag">React</li>
            <li className="techs__tag">Git</li>
            <li className="techs__tag">Express.js</li>
            <li className="techs__tag">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;