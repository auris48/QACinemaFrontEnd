import React from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import BookData from "./Data.json";
import Contact from "./Components/Contact";

import {Route, Routes } from "react-router-dom";

//adding search and contact router

function App() {
  return (
    <div className="App">

      
      <Routes>
      <Route path = "/SearchBar" element = {<><SearchBar /></>}></Route>
        <Route path = "/Contact" element = {<><Contact /></>}></Route>
        </Routes>

    </div>
  );
}

//<Route path = "/SearchBar" element = {<><SearchBar /></>}></Route>   this is the router 

//<SearchBar placeholder="Search for a movie..." data={BookData} />    this is the search bar data import


export default App;