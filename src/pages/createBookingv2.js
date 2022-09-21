import React, { useState, useEffect } from "react";

export default function CreateBookingV2() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [dateTimes, setDateTimes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movie/")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  const handleMovieSelect = (e) => {
    setMovie(JSON.parse(e.target.value));
    let datesArray = [];
    for (let i = 0; i < movie.dayShowing.length; i++) {
      let currentDate = movie.dayShowing[i].slice(0, 10);
      let currentTime = movie.dayShowing[i].slice(11, 16);
      datesArray[currentDate] = currentTime;
    }
    console.log(datesArray);
    setDateTimes(datesArray);
  };

  return (
    <div>
      <select onChange={handleMovieSelect} style={{ width: "100px" }}>
        {movies.map((movie) => (
          <option value={JSON.stringify(movie)}>{movie.title}</option>
        ))}
      </select>

      <select style={{ width: "100px" }}>
        {dateTimes.map((dateTime) => (
          <option value={dateTime}>{dateTime}</option>
        ))}
      </select>
    </div>
  );
}
