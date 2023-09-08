import React from "react";
import "./Techs.css";

 const Techs = () => {
   return (
     <section className="techs" id="technologies">
       <h2 className="techs__title">Технологии</h2>
       <div className="techs__container">
         <h3 className="techs__subtitle">7 технологий</h3>
         <p className="techs__text">На курсе веб-разработки мы освоили технологии, 
         которые применили в дипломном проекте.</p>
         <ul className="techs__list">
           <li className="techs__paragraph">HTML</li>
           <li className="techs__paragraph">CSS</li>
           <li className="techs__paragraph">JS</li>
           <li className="techs__paragraph">React</li>
           <li className="techs__paragraph">Git</li>
           <li className="techs__paragraph">Express.js</li>
           <li className="techs__paragraph">mongoDB</li>
         </ul>
       </div>
     </section>
   );
 };

 export default Techs;