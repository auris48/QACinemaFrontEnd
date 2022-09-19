import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movie")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="home">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="slider-movie-container">
            <img
              className="slider-images"
              src={movie.imageURL}
              alt={movie.title}
            />
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <p>{movie.releaseDate}</p>
              <Link to="/booking">Book Now</Link>
            </div>
          </div>
        ))}
      </Slider>
      <div>
        <img src="https://i.imgur.com/1ZQ2Z9r.jpg" alt="cinema" />
      </div>
    </div>
  );
}
