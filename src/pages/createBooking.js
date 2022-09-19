import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export function CreateBooking() {
  let items = [];

  const ticketOptions = [1, 2, 3, 4, 5];
  const [totalPrice, setTotalPrice] = useState({
    adult: 0,
    child: 0,
    concession: 0,
  });

  const [movieID, setMovieID] = useState();
  const [movieData, setMovieData] = useState([]);
  const [moviePic, setMoviePic] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [movieDays, setMovieDays] = useState([]);
  const [movieDaySelect, setMovieDaySelect] = useState("");
  const [movieDateToPost, setMovieDateToPost] = useState({
    day: 0,
    month: 0,
    year: 0,
    time: "",
  });

  useEffect(() => {
    retrieveMovies();
  }, []);

  useEffect(() => {}, [movieData]);

  useEffect(() => {
    console.log(movieDaySelect);
  }, [movieDaySelect]);

  useEffect(() => {
    setMovieDaySelect(movieDays[0]);

    setMovieDateToPost({
      ...movieDateToPost,
      day: new Date(movieDaySelect).toLocaleString("en-US", { day: "numeric" }),
      month: new Date(movieDaySelect).toLocaleString("en-US", {
        month: "numeric",
      }),
      year: new Date(movieDaySelect).toLocaleString("en-US", {
        year: "numeric",
      }),
      time: new Date(movieDaySelect).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    console.log(movieDateToPost);
  }, [movieDays]);

  const navigate = useNavigate();
  let filmsjson;

  async function handleSubmit() {
    console.log("DETAILS");
    console.log(movieID);
    console.log(movieDateToPost.year);
    console.log(movieDateToPost.month);
    console.log(movieDateToPost.day);
    console.log(movieDateToPost.time);
    console.log(totalPrice.adult);
    console.log(totalPrice.child);
    console.log(totalPrice.concession);
    try {
      const response = await fetch("http://localhost:3000/booking", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          userID: "6321d9400853a681d0bbd453",
          movieID: movieID,
          year: movieDateToPost.year,
          month: movieDateToPost.month,
          day: movieDateToPost.day,
          time: movieDateToPost.time,
          noOfTickets: {
            noOfAdult: totalPrice.adult,
            noOfChild: totalPrice.child,
            noOfConcession: totalPrice.concession,
          },
        }),
      });

      if (await response.ok) {
        const bookingID = await response.json().then((data) => data._id);
        console.log(bookingID);
        const createCheckoutSession = await fetch(
          "http://localhost:3000/create-checkout-session",
          {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              booking: bookingID,
            }),
          }
        );

        const session = await createCheckoutSession.json();
        window.location.href = session.url; 
      }
    } catch (e) {}
  }

  async function retrieveMovies() {
    try {
      const response = await fetch("http://localhost:3000/movie", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          accept: "*/*",
        },
        referrerPolicy: "no-referrer",
      });
      if (response.ok) {
        let items = [];
        filmsjson = await response.json();
        setMovieName(filmsjson[0].title);
        setMoviePic(filmsjson[0].imageURL);
        setMovieDesc(filmsjson[0].description);
        setMovieData(filmsjson);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="createBookingPage">
      <h1>Create Booking</h1>
      <div className="moviePanel">
        <img
          className="moviePicture"
          src={moviePic}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/placeholder.jpg";
          }}
        />
        <div className="movieDetails">
          <h1 className="movieTitle">{movieName}</h1>
          <p className="movieDescription">{movieDesc}</p>
        </div>
      </div>

      <div className="selectForm">
        <div className="selectDiv">
          <h4>Select a movie:</h4>
          <select
            onChange={(event) => {
              for (let movie of movieData) {
                if (event.target.value == movie._id) {
                  setMovieID(movie._id);
                  setMovieName(movie.title);
                  setMovieDesc(movie.description);
                  setMoviePic(movie.imageURL);
                  setMovieDays(movie.dayShowing);
                }
              }
            }}>
            {movieData.map((optiondata) => {
              return (
                <option value={optiondata._id}> {optiondata.title}</option>
              );
            })}
          </select>
        </div>

        <div className="selectDiv">
          <h4>Select a date:</h4>
          <select
            onChange={(event) => {
              setMovieDateToPost({
                ...movieDateToPost,
                day: new Date(event.target.value).toLocaleString("en-US", {
                  day: "numeric",
                }),
                month: new Date(event.target.value).toLocaleString("en-US", {
                  month: "numeric",
                }),
                year: new Date(event.target.value).toLocaleString("en-US", {
                  year: "numeric",
                }),
                time: new Date(event.target.value).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              });
              console.log(movieDateToPost);
            }}>
            {Array.from(
              new Set(
                movieDays.map((obj) =>
                  new Date(obj).toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })
                )
              )
            ).map((optiondata) => {
              return <option value={optiondata}>{optiondata}</option>;
            })}
          </select>
        </div>

        <div className="selectDiv">
          <h4>Select a time:</h4>
          <select
            onChange={(event) => {
              setMovieDateToPost({
                ...movieDateToPost,
                day: new Date(event.target.value).toLocaleString("en-US", {
                  day: "numeric",
                }),
                month: new Date(event.target.value).toLocaleString("en-US", {
                  month: "numeric",
                }),
                year: new Date(event.target.value).toLocaleString("en-US", {
                  year: "numeric",
                }),
                time: new Date(event.target.value).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              });
              console.log(movieDateToPost);
            }}>
            {movieDays.map((optiondata) => {
              let dateday = new Date(optiondata).toLocaleString("en-US", {
                day: "numeric",
              });
              let datemonth = new Date(optiondata).toLocaleString("en-US", {
                month: "numeric",
              });
              let dateyear = new Date(optiondata).toLocaleString("en-US", {
                year: "numeric",
              });

              let movieSelectYear = new Date(movieDaySelect).toLocaleString(
                "en-US",
                { year: "numeric" }
              );
              let movieSelectMonth = new Date(movieDaySelect).toLocaleString(
                "en-US",
                { month: "numeric" }
              );
              let movieSelectDay = new Date(movieDaySelect).toLocaleString(
                "en-US",
                { day: "numeric" }
              );

              console.log(
                movieSelectYear == dateyear &&
                  movieSelectMonth == datemonth &&
                  movieSelectDay == dateday
              );

              if (
                movieSelectYear == dateyear &&
                movieSelectMonth == datemonth &&
                movieSelectDay == dateday
              ) {
                return (
                  <option value={optiondata}>
                    {" "}
                    {new Date(optiondata).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </option>
                );
              }
            })}
          </select>
        </div>

        <div className="ticketSelects">
          <h4>Number of tickets</h4>
          <select
            onChange={(event) => {
              setTotalPrice({ ...totalPrice, adult: event.target.value });
            }}>
            <option value={0}>Adult (£10 per ticket)</option>
            {ticketOptions.map((option) => {
              return (
                <option value={option}>
                  {option + " Adult" + " (£" + option * 10 + ")"}
                </option>
              );
            })}
          </select>

          <select
            onChange={(event) => {
              setTotalPrice({ ...totalPrice, child: event.target.value });
            }}>
            <option value={0}>Child (£5 per ticket)</option>
            {ticketOptions.map((option) => {
              return (
                <option value={option}>
                  {option + " Child" + " (£" + option * 5 + ")"}
                </option>
              );
            })}
          </select>

          <select
            onChange={(event) => {
              setTotalPrice({ ...totalPrice, concession: event.target.value });
            }}>
            <option value={0}>Concession (£8 per ticket)</option>
            {ticketOptions.map((option) => {
              return (
                <option value={option}>
                  {option + " Concession" + " (£" + option * 8 + ")"}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <h1>
        {"£" +
          (Number(totalPrice.adult * 10) +
            Number(totalPrice.child * 5) +
            Number(totalPrice.concession * 8))}
      </h1>

      <button onClick={() => handleSubmit()}>Submit booking</button>
    </div>
  );
}
