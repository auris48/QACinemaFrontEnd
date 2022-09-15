
import DiscussionBoard from "./components/DiscussionBoard/DiscussionBoard";
import { BrowserRouter as Router } from "react-router-dom";
import { Link, Routes, Route } from "react-router-dom";
import PostThread from "./components/DiscussionBoard/PostThread";
import {Navbar} from './Navbar.js'
import { Home } from './pages/home.js';
import { Directions } from './pages/directions.js';
import { SignUp } from './pages/signup.js';
import { LogIn }  from './pages/login';



function App() {


  return (
    <div className="App">
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
      </Routes>
    </div>
  );
}

export default App;
