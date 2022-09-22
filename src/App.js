import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookData from "./Data.json";

import Contact from "./components/Contact";
import AboutUs from "./components/AboutPage/AboutUs";
//adding search and contact router
import DiscussionBoard from "./components/DiscussionBoard/DiscussionBoard";
import PostThread from "./components/DiscussionBoard/PostThread";

import { BrowserRouter as Router } from "react-router-dom";
import { Link, Routes, Route, useParams } from "react-router-dom";
import { Navbar } from "./Navbar.js";
import Footer from "./components/Footer/Footer";
import { Home } from "./pages/home.js";
import { Directions } from "./pages/directions.js";
import { SignUp } from "./pages/signup.js";
import { LogIn } from "./pages/login";
import { Logout } from "./pages/logout";
import { loginContext } from "./appContext/Context";
import { Bookings } from "./pages/bookings";
import { CreateBooking } from "./pages/createBooking";
import { ViewBookings } from "./pages/viewBookings";
import CreateBookingV2 from "./pages/createBookingv2/createBookingv2";
import UnreleasedMovies from "./components/UnreleasedMovies";
import MovieApp from "./components/MovieApp";
import Classifications from "./pages/Classifications";
import PaymentSuccess from "./components/PaymentResponses/Success";
import { ViewVenues } from "./pages/venues";

// issues with git
function App() {
  /*   const { publishableKey } = require("./config.json");
  const stripePromise = loadStripe(publishableKey); */
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setLoggedIn(true);
      setUser(user);
    }
  }, []);

  return (
    <div className="App">
      <loginContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
        <div className="main-content-wrap">
          <Navbar />
          <Routes>
            <Route
              path="/SearchBar"
              element={
                <>
                  <SearchBar />
                </>
              }></Route>
            <Route
              path="/Contact"
              element={
                <>
                  <Contact />
                </>
              }></Route>
            <Route
              path="/DiscussionBoard/page/:page"
              element={<DiscussionBoard user={user} loggedIn={loggedIn} />}
            />
            <Route path="/DiscussionBoard/Post/:id" element={<PostThread />} />
            {/* EXAMPLE-- to have multiple components on the page, wrap them in a fragment in the element tag */}
            <Route
              path="/example"
              element={
                <>
                  <Home />
                  <Directions />
                </>
              }></Route>
            <Route
              path="/signup"
              element={
                <>
                  <SignUp />
                </>
              }></Route>
            <Route
              path="/login"
              element={
                <>
                  <LogIn />
                </>
              }></Route>
            <Route path="/ccbv2" element={<CreateBookingV2 />} />
            {/* home page */}
            <Route path="/" element={<Home />}></Route>
            {/* directions page */}
            <Route path="/directions" element={<Directions />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/bookings" element={<Bookings />}></Route>
            <Route path="/viewbookings" element={<ViewBookings />}>
              {" "}
            </Route>
            <Route path="/createbooking" element={<CreateBooking />}>
              {" "}
            </Route>
            /<Route path="/AboutUs" element={<AboutUs />}></Route>
            <Route path="/Movies" element={<MovieApp />} />
            <Route path="/Venues" element={<ViewVenues />} />
            <Route path="/unreleasedMovies" element={<UnreleasedMovies />} />
            <Route path="/classifications" element={<Classifications />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          </Routes>
        </div>
      </loginContext.Provider>
    </div>
  );
}

export default App;

//<Route path = "/SearchBar" element = {<><SearchBar /></>}></Route>   this is the router

//<SearchBar placeholder="Search for a movie..." data={BookData} />    this is the search bar data import
