import { useNavigate } from "react-router-dom";

export function Bookings(){

    const navigate = useNavigate();

    return <div className="bookingsHome">
    <button onClick = {()=>{navigate("/viewbookings")}}>View Bookings</button>

    <button onClick = {()=>{navigate("/createbooking")}}>Create Booking</button>
    </div>
}