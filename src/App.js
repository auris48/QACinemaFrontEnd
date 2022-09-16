import React from "react";
import { Route, Routes } from "react-router-dom";
import UnreleasedMovies from "./components/UnreleasedMovies";
import MovieApp from "./components/MovieApp";

function App () {

    return (
        <div className="App">
            <Routes>
                <Route path="/Movies" element = {<MovieApp/>}/>
                <Route path="/unreleasedMovies" element = {<UnreleasedMovies/>}/>

            </Routes>
        </div>
    )
}

export default App;