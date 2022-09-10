import {SignPopup} from './signupPopup';
import React, {useState, useEffect} from 'react';

export function SignUp(){
    const [isOpen, setIsOpen] = useState(false);
    const [popupcontent, setpopupcontent] = useState("initial");

    const togglePopup =() => {
      setIsOpen(!isOpen);
    }

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

        const response = await fetch("http://localhost:3000/register", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: 
                JSON.stringify({"username": event.target.username.value,
            "password": event.target.password.value,
            "dateOfBirth": event.target.dateOfBirth.value,
            "email": event.target.email.value})
            // body data type must match "Content-Type" header
          })
          console.log(response.status);
          if (response.status !==200){
            setpopupcontent("Account creation failed, please try again");
          }
          else{
            setpopupcontent("Account creation successful!");
          }

          console.log(popupcontent);
          togglePopup();
            
          const response2 = await response.json();


          console.log(response2);
        //   return response.json();

        }

        console.log('form submitted ');
      ;

    return <div>
      { isOpen && <SignPopup content ={popupcontent} handleClose = {() => {togglePopup();}}
      />}
    <div className="signUpDiv">
        <h1>Create an account</h1>
    <div>
    <form onSubmit={handleSubmit}  className="signUpForm" action="http://localhost:3000/register" method="post">
        <div  className="signUpField">
        <label for="username">Username: </label>
        <br />
        <input type="text" id="username" name="username" />
        </div>
        <br />
        <div  className="signUpField">
        <label for="password">Password: </label>
        <br />
        <input type="password" id="password" name="password" />
        </div>
        <br />
        <div  className="signUpField">
        <label for="dateOfBirth">Date of Birth </label>
        <br />
        <input type="date" id="dateOfBirth" name="dateOfBirth" />
        </div>
        <br />
        <div  className="signUpField">
        <label for="email">Email </label>
        <br />
        <input type="email" id="Email" name="email" />
        </div>
        <br />
        <button type="submit">register</button>
    </form>
    </div>
    </div>
    </div>
}