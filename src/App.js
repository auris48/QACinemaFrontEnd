import './App.css';
import {Navbar} from './Navbar.js'
import { Home } from './pages/home.js';
import { Directions } from './pages/directions.js';
import { SignUp } from './pages/signup.js';
import { LogIn }  from './pages/login';
import { Route, Routes } from 'react-router-dom'


function App() {


  return (
    <div className="App">
      <Navbar/>
      <Routes>
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
