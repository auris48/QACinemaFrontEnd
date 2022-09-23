import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../appContext/Context";
export function ViewBookings() {
  const [movieJson, setMovieJson] = useState([]);
  const [bookingJson, setBookingJson] = useState([]);
  const { user } = useContext(loginContext);
  const navigate = useNavigate();
  let bookingnum = 1;

  useEffect(() => {
    if (user._id) {
      retrieveInformation(user._id);
    }
  }, [user]);

  const retrieveInformation = async (id) => {
    try {
      const bookingsResponse = await fetch(
        `http://localhost:3000/booking/user/${id}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          headers: {
            accept: "*/*",
          },
          referrerPolicy: "no-referrer",
        }
      );
      if (bookingsResponse.ok) {
        const moviesResponse = await fetch("http://localhost:3000/movie", {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          headers: {
            accept: "*/*",
          },
          referrerPolicy: "no-referrer",
        });
        if (moviesResponse.ok) {
          setMovieJson(await moviesResponse.json());
          console.log(movieJson);
          setBookingJson(await bookingsResponse.json());
          console.log(bookingJson);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="viewBookingsPage">
      {bookingJson.map((booking) => {
        console.log(booking.userID);
        return (
          <div className="bookingPanel">
            <h1>{bookingnum++}.</h1>
            <h1>{booking.movieID.title}</h1>
            <img
              alt="moviepic"
              src={booking.movieID.imageURL}
              className="moviePic"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/placeholder.jpg";
              }}
            />
            <h2>
              Adult: {booking.noOfTickets.noOfAdult} Child:
              {booking.noOfTickets.noOfChild} Concession:
              {booking.noOfTickets.noOfConcession}
            </h2>
            <h2>
              {booking.day}/{booking.month}/{booking.year} {booking.time}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
