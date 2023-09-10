import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about" id="project">
      <h2 className="about__title">О проекте</h2>
      <div className="about__container">
        <div className="about__information">
          <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
            финальные доработки.
          </p>
        </div>
        <div className="about__information">
          <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </div>
      </div>
      <ul className="about__time-interval">
        <li className="about__weeks about__green">1 неделя</li>
        <li className="about__weeks">4 недели</li>
        <li className="about__part">Back-end</li>
        <li className="about__part">Front-end</li>
      </ul>
    </section>
  );
}

export default AboutProject;
