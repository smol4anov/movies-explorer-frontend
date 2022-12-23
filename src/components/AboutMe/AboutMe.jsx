import './AboutMe.css';
import photo from '../../images/student.jpg';

function AboutMe(props) {

  const { githubLink } = props;

  return (
    <section id="about-me" className="about-me">
      <div className="about-me__wrapper">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__content">
          <div className="about-me__content-column">
            <div className="about-me__anket">
              <p className="about-me__title-name">Сергей</p>
              <p className="about-me__subtitle">Фронтенд-разработчик, 43 года</p>
              <p className="about-me__text">Я родился в Саратове, почти закончил мех-мат СГУ. Сейчас живу в Батуми. У меня есть жена
                и дочь. Я люблю слушать музыку, велосипед и прогулки. С 2014г. начал кодить в 1С. Сейчас работаю ведущим разработчиком 1С в крупной московской компании. После того, как прошёл курс по веб-разработке, ломаю голову - как перейти в веб-разработку без существенной потери в доходах.</p>
            </div>
            <a href={githubLink} target="_blanck" className="about-me__github-link">Github</a>
          </div>
          <img src={photo} alt="Student" className="about-me__photo" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;