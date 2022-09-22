import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ViewBookings() {
  const [movieJson, setMovieJson] = useState([]);
  const [bookingJson, setBookingJson] = useState([]);
  const navigate = useNavigate();
  let bookingnum = 1;

  useEffect(() => {
    retrieveInformation();
  }, []);

  const retrieveInformation = async () => {
    try {
      const bookingsResponse = await fetch("http://localhost:3000/booking", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          accept: "*/*",
        },
        referrerPolicy: "no-referrer",
      });
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
      <h1 className="bookingsTitle">Your Bookings!</h1>
      {bookingJson.map((booking) => {
        console.log(booking.userID);
        if (booking.userID == JSON.parse(sessionStorage.getItem("user"))._id) {
          return (
            <div className="bookingPanel">
              <h1>Booking: {bookingnum++}</h1>
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
              <h1>
                Adult: {booking.noOfTickets.noOfAdult} Child:
                {booking.noOfTickets.noOfChild} Concession:
                {booking.noOfTickets.noOfConcession}
              </h1>
              <h1>
                {booking.day}/{booking.month}/{booking.year} {booking.time}
              </h1>
            </div>
          );
        }
      })}
    </div>
  );
}
