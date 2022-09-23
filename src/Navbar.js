import { Link } from "react-router-dom";
import { loginContext } from "./appContext/Context";
import { Logout } from "./pages/logout";
import { useContext } from "react";

// issues with git
//more issues
export function Navbar() {
  const { loggedIn, setLoggedIn } = useContext(loginContext);

  return (
    <nav>
      <div className="leftdiv">
        <img className="qalogo" src="./qalogo.png" alt="qalogo" />
      </div>

      <div className="centerdiv">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/directions">
          Directions
        </Link>

        <Link className="link" to="/AboutUs">
          About Us
        </Link>

        {loggedIn ? (
          <Link className="link" to="/Bookings">
            Bookings
          </Link>
        ) : (
          <span></span>
        )}

        <div className="dropdown">
          <button className="dropbtn">Movies &#11167;</button>
          <div className="dropdown-content">
            <Link className="link" to="/Movies">
              Curently Showing
            </Link>
            <Link className="link" to="/unreleasedMovies">
              Coming Soon !
            </Link>
            <Link className="link" to="/classifications">
              Film Classification
            </Link>
          </div>
        </div>

        <Link className="link" to="/DiscussionBoard/page/1">
          Reviews
        </Link>
      </div>

      {loggedIn ? (
        <div>
          <Logout
            style={{ marginLeft: "100px" }}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </div>
      ) : (
        <div className="rightdiv">
          <Link className="link" to="/login">
            Log in
          </Link>
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
