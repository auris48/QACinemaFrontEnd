import { useNavigate } from "react-router-dom";

export function Bookings(){

    const navigate = useNavigate();

    return <div className="bookingsHome">
    <button className="button1" onClick = {()=>{navigate("/viewbookings")}}><p>View Bookings</p></button>

    <button className="button2" onClick = {()=>{navigate("/createbooking")}}><p>Create Booking</p></button>
    </div>
}