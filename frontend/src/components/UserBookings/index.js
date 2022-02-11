import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRides } from "../../store/rides";
import { loadBookings, removeBooking } from '../../store/bookings';
import './UserBookings.css';

const UserBookings = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const bookings = useSelector(state => {
        return Object.values(state.bookings)
    });
    const rides = useSelector(state => {
        return Object.values(state.rides);
    })

    useEffect(() => {
        dispatch(loadBookings(user?.id));
        dispatch(getRides())
    }, [])

    // console.log(rides);

    const formatDateString = (date) => {
        const dateObject = new Date(date);
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObject)
        const day = dateObject.getUTCDate(); //bc is booked based on local time then converted to Date
        const year = dateObject.getFullYear();

        return `${month} ${day}, ${year}`;
        // return date;
    }

    const handleDelete = (id) => {
        dispatch(removeBooking(id));
    }

    // const bookingsArr = Object.values(bookings);

    return (
        <div className="bookings-container">
            <h2 className="bookings-title">{user.username}'s Bookings</h2>
            {bookings?.map((booking) => {
                const startDate = formatDateString(booking.startDate);
                const endDate = formatDateString(booking.endDate);

                return (
                    <div
                        className="booking-container"
                        key={booking.id}>
                        <div className="booking-dtls-container">
                            <NavLink className="booking-name" to={`/rides/${booking.rideId}`}>
                                {rides[booking?.rideId - 1]?.name}
                            </NavLink>
                            <div>from: {startDate}</div>
                            <div>to: {endDate}</div>
                        </div>
                        <button
                            onClick={() => handleDelete(booking?.id)}
                            className="dlt-booking-btn">
                            Delete Booking
                        </button>
                    </div>
                )
            })}
        </div>
    );
};

export default UserBookings;
