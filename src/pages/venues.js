import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function ViewVenues() {
  const [bookingJson, setBookingJson] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    retrieveInformation();
  }, []);

  const retrieveInformation = async () => {
    try {
      const bookingsResponse = await fetch("http://localhost:3000/venue", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          accept: "*/*",
        },
        referrerPolicy: "no-referrer",
      });
      setBookingJson(await bookingsResponse.json());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="viewBookingsPage">
      <h1 className="bookingsTitle">Nearby Venues</h1>
      {bookingJson.map((venue) => {
        return (
          <div className="bookingPanel">
            <h1>{venue.name}</h1>
            <h1>{venue.openingTimes}</h1>
            <img
              alt="moviepic"
              src={venue.imageURL}
              className="moviePic"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/placeholder.jpg";
              }}
            />
            <p>{venue.description}</p>
          </div>
        );
      })}
    </div>
  );
}
