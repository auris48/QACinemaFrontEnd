import React, { useEffect, useState } from "react";
import "./CSS/Movies.css";
import { Button, Container } from "react-bootstrap";

const FEATURED_API = "http://localhost:3000/Movie";

function MovieApp() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(FEATURED_API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, []);

  const onSearchSelect = (title) => {
    setMovies((prevMovies) => {
      [...prevMovies].filter((movie) => movie.title === title);
    });
  };

  const filterUnreleasedMovies = () => {
    let releaseMovies = [];
    let today = new Date().toISOString().slice(0, 10);
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].releaseDate < today) {
        releaseMovies.push(movies[i]);
      }
    }
    return releaseMovies;
  };
  console.log(
    movies.filter((movie) => {
      return movie.releaseDate < Date.now;
    })
  );
  return (
    <div className="container">
      {filterUnreleasedMovies().map((movie, index) => (
        <div key={index} className="movie-componants">
          <div className="movie-componant-header">
            <p>{movie.title}</p>
            <p>{movie.runTime}</p>
          </div>

          <img src={movie.imageURL}></img>

          <div className="movie-details">
            <p>{movie.description}</p>
            <p>{movie.actors}</p>
            <p>{movie.directors}</p>
          </div>


            <div className="movie-actions">
              <a href="http://localhost:3001/createbooking">
                <button href = "/createBooking">Book Now</button>
              </a>

            <a href={movie.trailerURL}>
              <button>Trailer</button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MovieApp;
