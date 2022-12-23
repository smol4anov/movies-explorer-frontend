import './AboutProject.css';

function AboutProject() {
  return (
    <section id="about-project" className="project">
      <h2 className="project__title">О проекте</h2>
      <ul className="project__content">
        <li className="project__items">
          <h3 className="project__item-title">Дипломный проект включал 5 этапов</h3>
          <p className="project__item-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="project__items">
          <h3 className="project__item-title">На выполнение диплома ушло 5 недель</h3>
          <p className="project__item-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className="project__infografic">
        <li className="project__infografic-backend">
          <p className="project__infografic-time project__infografic-time_backend">1 неделя</p>
          <p className="project__infografic-subtitle">Back-end</p>
        </li>
        <li className="project__infografic-frontend">
          <p className="project__infografic-time">4 недели</p>
          <p className="project__infografic-subtitle">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;