import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { SignPopup } from './signupPopup';
import { useForkRef } from "@mui/material";

export function CreateBooking() {

    const [isOpen, setIsOpen] = useState(false);
    const [popupcontent, setpopupcontent] = useState("initial");

    const togglePopup =() => {
      setIsOpen(!isOpen);
    }





    const ticketOptions = [1, 2, 3, 4, 5,6 ,7 ,8 ,9 ,10];
    const [totalPrice, setTotalPrice] = useState({ adult: 0, child: 0, concession: 0 });


    const [movieID, setMovieID] = useState();
    const [movieData, setMovieData] = useState([]);
    const [moviePic, setMoviePic] = useState("");
    const [movieName, setMovieName] = useState("");
    const [movieDesc, setMovieDesc] = useState("");
    const [movieDays, setMovieDays] = useState([]);
    const [movieDaySelect, setMovieDaySelect] = useState("");
    const [movieDateToPost, setMovieDateToPost] = useState({ day: 0, month: 0, year: 0, time: "" });


    useEffect(() => {
        console.log(movieDateToPost);
    }, [movieDateToPost])

    useEffect(() => {
        retrieveMovies();
    }, [])

    useEffect(() => {  
        setMovieDateToPost({ ...movieDateToPost, day: new Date(movieDaySelect).toLocaleString('en-US', { day: "numeric" }), month: new Date(movieDaySelect).toLocaleString('en-US', { month: "numeric" }), year: new Date(movieDaySelect).toLocaleString('en-US', { year: "numeric" }), time: new Date(movieDaySelect).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }) })
    }, [movieDaySelect])

    useEffect(() => {
        setMovieDaySelect(movieDays[0]);
    }, [movieDays])



    const navigate = useNavigate();
    let filmsjson;




    async function handleSubmit() {
        if ((Number(totalPrice.adult) + Number(totalPrice.child) + Number(totalPrice.concession)) === 0){
            setpopupcontent("Must book at least one ticket")
            togglePopup();
        }
        else if((Number(totalPrice.adult) + Number(totalPrice.child) + Number(totalPrice.concession)) > 10){
            setpopupcontent("Cannot book more than 10 tickets at one time")
            togglePopup();
        }

        else{
        try {
            const response = await fetch("http://localhost:3000/booking", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body:
                    JSON.stringify({
                        "userID": "6321d9400853a681d0bbd453",
                        "movieID": movieID,
                        "year": movieDateToPost.year,
                        "month": movieDateToPost.month,
                        "day": movieDateToPost.day,
                        "time": movieDateToPost.time,
                        "noOfTickets":
                        {
                            "noOfAdult": totalPrice.adult,
                            "noOfChild": totalPrice.child,
                            "noOfConcession": totalPrice.concession
                        }
                    })
            })


        }
        catch (e) { }

    }}




    async function retrieveMovies() {
        try {
            const response = await fetch("http://localhost:3000/movie", {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'accept': '*/*',
                },
                referrerPolicy: 'no-referrer',
            })
            if (response.ok) {
                filmsjson = await response.json();
                setMovieID(filmsjson[0]._id);
                setMovieName(filmsjson[0].title);
                setMoviePic(filmsjson[0].imageURL);
                setMovieDesc(filmsjson[0].description);
                setMovieData(filmsjson);
                setMovieDays(filmsjson[0].dayShowing)
            }
        }
        catch (error) {
            console.error(error);
        }
    }







    return <div className="createBookingPage">
        <div className="pageOutline">
        <h1 className="bookingsTitle">Create Booking</h1>
        <div className="moviePanel">
            <img alt ="moviepic" className="moviePicture"
                src={moviePic}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/placeholder.jpg";
                }}
            />
            <div className="movieDetails">
                <h1 className="movieTitle">{movieName}</h1>
                <p className="movieDescription">{movieDesc}</p>
            </div>
        </div>






        <div className="selectForm">


            <div className="selectDiv">

                <h4>Select a movie:</h4>
                <select onChange={

                    (event) => {
                    for (let movie of movieData) {
                        if (event.target.value === movie._id) {
                            setMovieID(movie._id);
                            setMovieName(movie.title);
                            setMovieDesc(movie.description);
                            setMoviePic(movie.imageURL);
                            setMovieDays(movie.dayShowing);
                        }
                    }
                }}>
                    {movieData.map((optiondata) => {
                        return <option value={optiondata._id}> {optiondata.title}</option>
                    }

                    )}
                </select>

            </div>


            <div className="selectDiv">
                <h4>Select a date:</h4>
                <select onChange={(event) => {
                    setMovieDateToPost({ ...movieDateToPost, day: new Date(event.target.value).toLocaleString('en-US', { day: "numeric" }), month: new Date(event.target.value).toLocaleString('en-US', { month: "numeric" }), year: new Date(event.target.value).toLocaleString('en-US', { year: "numeric" }) })
                    // setMovieDays(movieDateToPost);
                }}>

                    {Array.from(new Set(movieDays.map(obj => new Date(obj).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "numeric", year: "numeric" })))).map(optiondata => {
                        return <option value={optiondata}>{optiondata}</option>
                    })}
                </select>
            </div>



            <div className="selectDiv">
                <h4>Select a time:</h4>
                <select onChange={(event) => {
                    setMovieDateToPost({ ...movieDateToPost, time: new Date(event.target.value).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }) })
                }}>
                    <option> Select Time</option>
                    {movieDays.map((optiondata) => {
                        let dateday = new Date(optiondata).toLocaleString('en-US', { day: "numeric" });
                        let datemonth = new Date(optiondata).toLocaleString('en-US', { month: "numeric" });
                        let dateyear = new Date(optiondata).toLocaleString('en-US', { year: "numeric" });

                        let movieSelectYear = new Date(movieDaySelect).toLocaleString('en-US', { year: "numeric" });
                        let movieSelectMonth = new Date(movieDaySelect).toLocaleString('en-US', { month: "numeric" });
                        let movieSelectDay = new Date(movieDaySelect).toLocaleString('en-US', { day: "numeric" });


                        if (movieSelectYear === dateyear && movieSelectMonth === datemonth && movieSelectDay === dateday) {
                            return <option value={optiondata}> {new Date(optiondata).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}</option>
                        }
                    })}
                </select>
            </div>





            <div className="ticketSelects">
                <h4>Number of tickets:</h4>
                <select onChange={(event) => { setTotalPrice({ ...totalPrice, adult: event.target.value }) }
                }>
                    <option value={0}>Adult (£10 per ticket)</option>
                    {ticketOptions.map((option) => {
                        return <option value={option}>{option + " Adult" + " (£" + (option * 10) + ")"}</option>
                    })}
                </select>

                <select onChange={(event) => { setTotalPrice({ ...totalPrice, child: event.target.value }) }}>
                    <option value={0}>Child (£5 per ticket)</option>
                    {ticketOptions.map((option) => {
                        return <option value={option}>{option + " Child" + " (£" + (option * 5) + ")"}</option>
                    })}
                </select>

                <select onChange={(event) => { setTotalPrice({ ...totalPrice, concession: event.target.value }) }}>
                    <option value={0}>Concession (£8 per ticket)</option>
                    {ticketOptions.map((option) => {
                        return <option value={option}>{option + " Concession" + " (£" + (option * 8) + ")"}</option>
                    })}
                </select>
            </div>





        </div>

        <h1 class ="priceTag">{"£" + (Number(totalPrice.adult*10) + Number(totalPrice.child*5) + Number(totalPrice.concession*8))}</h1>

        <button onClick={() => handleSubmit()}>Submit booking</button>

        { isOpen && <SignPopup content ={popupcontent} handleClose = {() => {togglePopup();}}
      />}
    </div>
    </div>
}

