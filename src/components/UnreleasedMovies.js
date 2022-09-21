import React, { useEffect, useState } from "react";
import "./CSS/UnreleasedMovies.css";
import { Button, Container } from "react-bootstrap";
import SearchBar from "./SearchBar";

const FEATURED_API = "http://localhost:3000/unreleasedMovie";

function UnreleasedMovies() {
  const [unreleasedMovies, setunreleasedMovies] = useState([]);

  useEffect(() => {
    fetch(FEATURED_API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setunreleasedMovies(data);
      });
  }, []);

  const handleFilter = () => {};
  const onSearchSelect = (title) => {
    console.log(title);
    console.log("clicked");
    setunreleasedMovies(
      [...unreleasedMovies].filter(
        (unreleasedMovies) => unreleasedMovies.title === title
      )
    );
  };

  return (
    <div className="title_unreleased">
      <h>Coming Soon</h>
      <SearchBar
        data={unreleasedMovies}
        onFilter={handleFilter}
        handleClick={(title) => {
          onSearchSelect(title);
        }}
      />
      <div className="unreleasedMovie-container">
        {unreleasedMovies.map((unreleasedMovies) => (
          <div className="unreleasedMovies-componants">
            <div className="unreleasedMovies-componant-header">
              <p>{unreleasedMovies.title}</p>
            </div>

            <img src={unreleasedMovies.imageURL}></img>

            <div className="unreleased-movie-details">
              <p>{unreleasedMovies.description}</p>
              <h>Release Date:</h>
              <p>{unreleasedMovies.releaseDate}</p>
            </div>

            <div className="unreleased-movie-actions">
              <a href={unreleasedMovies.trailerURL}>
                <button>Watch Trailer Now</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnreleasedMovies;
