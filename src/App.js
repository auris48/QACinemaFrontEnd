import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import BookData from "./Data.json";
import Contact from "./components/Contact";

//adding search and contact router
import DiscussionBoard from "./components/DiscussionBoard/DiscussionBoard";
import { BrowserRouter as Router } from "react-router-dom";
import { Link, Routes, Route, useParams } from "react-router-dom";
import PostThread from "./components/DiscussionBoard/PostThread";
import { Navbar } from "./Navbar.js";
import { Home } from "./pages/home.js";
import { Directions } from "./pages/directions.js";
import { SignUp } from "./pages/signup.js";
import { LogIn } from "./pages/login";
import { Logout } from "./pages/logout";
import { loginContext } from "./appContext/Context";
import { useState } from "react";
import { Bookings } from "./pages/bookings";
import { CreateBooking } from "./pages/createBooking";
import { ViewBookings } from "./pages/viewBookings";
import UnreleasedMovies from "./components/UnreleasedMovies";
import MovieApp from "./components/MovieApp";
import Classifications from "./pages/Classifications";

// issues with git
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Navbar />
        <Routes>
          <Route
            path="/SearchBar"
            element={
              <>
                <SearchBar />
              </>
            }
          ></Route>
          <Route
            path="/Contact"
            element={
              <>
                <Contact />
              </>
            }
          ></Route>
          <Route
            path="/DiscussionBoard/page/:page"
            element={<DiscussionBoard />}
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
            }
          ></Route>

          <Route
            path="/signup"
            element={
              <>
                <SignUp />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <LogIn />
              </>
            }
          ></Route>

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
          <Route path="/Movies" element={<MovieApp />} />
          <Route path="/unreleasedMovies" element={<UnreleasedMovies />} />
          <Route path="/Classifications" element={<Classifications />} />
        </Routes>
      </loginContext.Provider>
    </div>
  );
}

//<Route path = "/SearchBar" element = {<><SearchBar /></>}></Route>   this is the router

//<SearchBar placeholder="Search for a movie..." data={BookData} />    this is the search bar data import

export default App;
