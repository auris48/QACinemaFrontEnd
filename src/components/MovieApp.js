import React, { useEffect, useState } from "react";
import "./CSS/Movies.css";
import { Button, Container } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { loginContext } from "../appContext/Context";
const FEATURED_API = "http://localhost:3000/Movie";

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [clearSearch, setClearSearch] = useState(false);
  const { loggedIn } = useContext(loginContext);

  useEffect(() => {
    fetch(FEATURED_API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, []);

  useEffect(() => {
    console.log("hello world");
    fetch(FEATURED_API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, [clearSearch]);

  const handleFilter = () => {};
  const onSearchSelect = (title) => {
    setMovies([...movies].filter((movies) => movies.title === title));
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

  const onSearchCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("hi");
    setClearSearch((prev) => !prev);
  };

  return (
    <div className="headerForTitle">
      <h>Watch Now</h>
      <SearchBar
        data={filterUnreleasedMovies()}
        onFilter={handleFilter}
        handleCancel={onSearchCancel}
        handleClick={(title) => {
          onSearchSelect(title);
        }}
      />
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
              <p>Actors: {movie.actors}</p>
              <p>Directors: {movie.director}</p>
              <p>Ratings: {movie.classification}</p>
            </div>

            <div className="movie-actions">
              <a
                href={
                  loggedIn
                    ? `http://localhost:3001/createbooking/${movie._id}`
                    : "/login"
                }>
                <button href="/createBooking">Book Now</button>
              </a>

              <a href={movie.trailerURL}>
                <button>Trailer</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MovieApp;
