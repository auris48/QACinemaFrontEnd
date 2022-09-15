
import DiscussionBoard from "./components/DiscussionBoard/DiscussionBoard";
import { BrowserRouter as Router } from "react-router-dom";
import { Link, Routes, Route } from "react-router-dom";
import PostThread from "./components/DiscussionBoard/PostThread";
import {Navbar} from './Navbar.js'
import { Home } from './pages/home.js';
import { Directions } from './pages/directions.js';
import { SignUp } from './pages/signup.js';
import { LogIn }  from './pages/login';
import { Logout } from './pages/logout';
import { loginContext } from './appContext/Context'
import { useState } from 'react';



// issues with git
function App() {

  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div className="App">
      <loginContext.Provider value = {{loggedIn, setLoggedIn}}>
      <Navbar/>
      <Routes>
        <Route path="/DiscussionBoard" element={<DiscussionBoard />} />
        <Route path="/DiscussionBoard/Post/:id" element={<PostThread />} />
        {/* EXAMPLE-- to have multiple components on the page, wrap them in a fragment in the element tag */}
        <Route path = "/example" element = {<><Home /><Directions /></>}></Route>

        <Route path = "/signup" element = {<><SignUp /></>}></Route>
        <Route path = "/login" element = {<><LogIn /></>}></Route>


        {/* home page */}
        <Route path = "/" element = {<Home />}></Route>

        {/* directions page */}
        <Route path = "/directions" element = {<Directions />}></Route>

        <Route path = "/logout" element = {<Logout />}></Route>
      </Routes>
      </loginContext.Provider>
    </div>
  );
}

export default App;
