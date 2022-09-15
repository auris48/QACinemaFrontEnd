import { SignPopup } from "./signupPopup";
import React, { useState, useEffect } from "react";
import { loginContext } from "../appContext/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//issues with git
export const LogIn = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(loginContext);
  const { user, setUser } = useContext(loginContext);
  const [isOpen, setIsOpen] = useState(false);
  const [popupcontent, setpopupcontent] = useState("initial");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // setpopupcontent("not");
  }, [isOpen]);

  const handleSubmit = async function (event) {
    event.preventDefault();
    // console.log("test");
    // const data = new FormData(event.target);
    // console.log(JSON.stringify(data));

    // console.log(data.get('username'));
    // console.log(event.target.username.value);

    const response = await fetch("http://localhost:3000/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        cookie: "",
        accept: "*/*",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
      }),
      // body data type must match "Content-Type" header
    }).catch(() => {
      setpopupcontent("Login failed");
      togglePopup();
    });

    if (response.status !== 200) {
      setpopupcontent("Login failed");
    } else {
      setLoggedIn(true);

      const data = await response.json();
      setUser(data);
      navigate("/");
      // setpopupcontent("Login successful");
    }

    console.log(popupcontent);
    togglePopup();

    //   return response.json();
  };

  console.log("form submitted ");
  return (
    <div>
      {isOpen && (
        <SignPopup
          content={popupcontent}
          handleClose={() => {
            togglePopup();
          }}
        />
      )}
      <div className="logInDiv">
        <h1>Log into your account</h1>
        <form
          onSubmit={handleSubmit}
          className="logInForm"
          action="http://localhost:3000/login"
          method="post">
          <div className="logInField">
            <label for="username">Username: </label>
            <br />
            <input type="text" id="username" name="username" />
          </div>
          <br />
          <div className="logInField">
            <label for="password">Password: </label>
            <br />
            <input type="password" id="password" name="password" />
          </div>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
