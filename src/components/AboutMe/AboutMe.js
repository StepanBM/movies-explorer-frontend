import "./AboutMe.css";
import foto from "../../images/foto.png";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__information">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__work">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__characteristic">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть
            жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал
            кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл
            курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной
            работы.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/StepanBM/movies-explorer-frontend"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__foto" src={foto} alt="Фотография студента" />
      </div>
    </section>
  );
}

export default AboutMe;
