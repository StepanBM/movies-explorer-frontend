import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


 function SavedMovies({cards}) {

   return (
     <section className='saved-movies'>
       <SearchForm/>
       <MoviesCardList cards={cards}/>
     </section>
   );
 }

 export default SavedMovies;