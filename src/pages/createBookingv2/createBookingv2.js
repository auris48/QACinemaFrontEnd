import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import "./styles.css";
export default function CreateBookingV2() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [dateTimes, setDateTimes] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [times, setTimes] = useState();
  const [selectedTime, setSelectedTime] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/movie/")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  useEffect(() => {
    let datesArray = [];
    if (movie) {
      for (let i = 0; i < movie.dayShowing.length; i++) {
        let currentDate = movie.dayShowing[i].slice(0, 10);
        let currentTime = movie.dayShowing[i].slice(11, 16);
        if (!datesArray[currentDate]) {
          datesArray[currentDate] = [];
        }
        datesArray[currentDate].push(currentTime);
      }
      setDateTimes(datesArray);
    }
  }, [movie]);

  /* useEffect(() => {
    setTimes();
  }, [selectedDate]); */

  useEffect(() => {
    setTimes();
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      setTimes(dateTimes[selectedDate]);
    }
  }, [selectedDate]);

  const handleMovieSelect = (e) => {
    setMovie();
    setDateTimes();
    setSelectedDate();
    setTimes();
    setMovie(JSON.parse(e.target.value));
  };

  const handleSelectDate = (e) => {
    setTimes();
    setSelectedTime();
    setSelectedDate(e.target.value);
  };

  console.log("hi");

  const handleSelectTime = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedDate + " " + selectedTime);
  };
  console.log(times);
  /* console.log(movie); */
  return (
    <div>
      <form className="bookings-select-date-form" onSubmit={handleSubmit}>
        <label htmlFor="movie-select">Select Movie</label>
        {movies && (
          <div>
            <select name="movie-select" onChange={handleMovieSelect}>
              <option value="Select Movie" selected disabled hidden>
                Select Movie
              </option>
              {movies.map((movie) => (
                <option value={JSON.stringify(movie)}>{movie.title}</option>
              ))}
            </select>
          </div>
        )}

        {dateTimes && (
          <select onChange={handleSelectDate}>
            <option value="" selected disabled hidden>
              Select Date
            </option>
            {Object.keys(dateTimes).map((date) => (
              <option value={date}>{date}</option>
            ))}
          </select>
        )}

        {times && (
          <select onChange={handleSelectTime}>
            <option value={selectedTime} selected disabled hidden>
              Select Time
            </option>
            {times.map((time) => (
              <option value={time}>{time}</option>
            ))}
          </select>
        )}
        <button>Submit</button>
      </form>
    </div>
  );
}
