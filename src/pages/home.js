import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export function Home() {
  const [movies, setMovies] = useState([]);

  const navigationImagesArray = [
    "https://i.pinimg.com/originals/0c/0d/0d/0c0d0d1b1b1b1b1b1b1b1b1b1b1b1b1b.jpg",
    "https://octaneseating.com/pub/media/catalog/category/fanfare-main-image.jpg",
  ];

  useEffect(() => {
    fetch("http://localhost:3000/movies/featured")
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
      <div className="home-hero">
        <h1>Welcome to QA Cinema!</h1>
        <p>
          We at QA cinema seek to provide the highest quality viewing experience
          for film buffs and casual movie-goers. We have a wide range of films
          to suit all tastes, from the latest blockbusters to the classics of
          yesteryear. Our cinema is located in the heart of London near Tower
          Bridge. Book your tickets now!
        </p>
      </div>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="slider-movie-container">
            <div
              className="slider-images"
              style={{ backgroundImage: `url(${movie.sliderImageURL})` }}
              alt={movie.title}
            />
            <div className="slider-movie-info">
              <h1>{movie.title}</h1>
              <p>{movie.releaseDate}</p>
              <Link to="/booking">Book Now</Link>
            </div>
          </div>
        ))}
      </Slider>
      <div className="home-focus-movie">
        <div className="home-focus-movie-info">
          <p>
            In the distant technological future, civilization has reached its
            ultimate Net-based form. An "infection" in the past caused the
            automated systems to spiral out of order, resulting in a
            multi-leveled city structure that replicates itself infinitely in
            all directions. Now humanity has lost access to the city's controls,
            and is hunted down and purged by the defense system known as the
            Safeguard. In a tiny corner of the city, a little enclave known as
            the Electro-Fishers is facing eventual extinction, trapped between
            the threat of the Safeguard and dwindling food supplies. A girl
            named Zuru goes on a journey to find food for her village, only to
            inadvertently cause doom when an observation tower senses her and
            summons a Safeguard pack to eliminate the threat. With her
            companions dead and all escape routes blocked, the only thing that
            can save her now is the sudden arrival of Kiri the Wanderer, on his
            quest for the Net Terminal Genes, the key to restoring order to the
            world.
          </p>
          <img
            src="https://pm1.narvii.com/6476/0a4d1311613a710b787ab20e02211da2322c7046_hq.jpg"
            alt="cinema"
          />
        </div>
        <iframe
          width="100%"
          height="600px"
          src="https://www.youtube.com/embed/hwy806RC2-Q"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      <h1 className="home-section-heading">Check out our latest offers!</h1>
      <div className="cinema-offers">
        <div className="cinema-offering">
          <img
            src="https://media.istockphoto.com/vectors/movie-popcorn-vector-id165039195?b=1&k=20&m=165039195&s=170667a&w=0&h=hMv0X9iQdr1D-CSm1hoMJh2uWjFp49ThHFbCKWRyMLI="
            alt="popcorn"
          />
          <div className="cinema-offer-info">
            <h1>Popcorn</h1>
            <h3>Enjoy a large bag of popcorn for only £3.50!</h3>
          </div>
        </div>
        <div className="cinema-offering">
          <div className="cinema-offer-info">
            <h1>Burger Meal</h1>
            <h3>Enjoy our char-grilled burger and fries for only £7.99!</h3>
          </div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/006/624/649/original/illustration-of-a-stylized-hamburger-or-cheeseburger-fast-food-food-isolated-on-a-white-background-cartoon-delicious-big-hamburger-with-cheese-and-sesame-seeds-isolated-on-a-white-background-vector.jpg"
            alt="Burger And Fries Clipart Png - Hamburgem"
          />
        </div>
        <div className="cinema-offering">
          <img
            src="https://media.istockphoto.com/vectors/snack-product-in-circle-fast-food-snacks-drinks-nuts-chips-cracker-vector-id1149361021?k=20&m=1149361021&s=612x612&w=0&h=M53kYTJRnHPSewjjhTLR7PA04AdKUkCNN8P1QXgJWp8="
            alt="Burger And Fries Clipart Png - Hamburgem"
          />
          <div className="cinema-offer-info">
            <h1>Snack Bar</h1>
            <h3>All popular snacks are available at normal prices</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
