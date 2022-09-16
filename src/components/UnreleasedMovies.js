import React, {useEffect, useState,} from "react";
import './CSS/UnreleasedMovies.css';
import { Button, Container } from "react-bootstrap";



const FEATURED_API = "http://localhost:3000/unreleasedMovie"

function UnreleasedMovies() {
  const [unreleasedMovies, setunreleasedMovies ] = useState([]);


  useEffect(() => {
            fetch(FEATURED_API).then(response => response.json())
            .then(data => {
              console.log(data)
              setunreleasedMovies(data);
            });

  },[]);
  
  return <div className="unreleasedMovie-container"> 
      {unreleasedMovies.map((unreleasedMovies) => 
          <div className="unreleasedMovies-componants">
          <div className="unreleasedMovies-componant-header">
        <p>{unreleasedMovies.title}</p>
        </div>
    
        <img src={unreleasedMovies.imageURL} ></img>
       
        <div className="unreleased-movie-details">
        <p>{unreleasedMovies.description}</p>  
        </div>
    
        <div className="unreleased-movie-actions">  
        <a href={unreleasedMovies.trailerURL}><button>Trailer</button></a>
          </div>
        </div> 
    
        
        )}
        
    
        </div>
}

        export default UnreleasedMovies;