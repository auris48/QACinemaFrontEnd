import React, {useEffect, useState} from "react";
import "./components/CSS/Movies.css";
import { Button, Container } from "react-bootstrap";

const FEATURED_API = "http://localhost:3000/Movie"

function MovieApp() {
  const [movies, setMovies ] = useState([]);


  useEffect(() => {
            fetch(FEATURED_API).then(response => response.json())
            .then(data => {
              console.log(data)
              setMovies(data);
            });

  },[]);
  
  return <div className="container"> 
      {movies.map((movie) => 
    
    

    <div className="movie-componants">
      <div className="movie-componant-header">
    <p>{movie.title}</p>
    <p>{movie.runTime}</p>
    </div>

    <img src={movie.imageURL} ></img>
   
    <div className="movie-details">
    <p>{movie.description}</p>  
    <p>{movie.actors}</p>
    <p>{movie.directors}</p>
    </div>

    <div className="movie-actions">
    <button> Book Now </button>

    <a href={movie.trailerURL}><button>Trailer</button></a>
      </div>
    </div> 

    
    )}
    
    
    </div>
       
  

}

export default MovieApp;


