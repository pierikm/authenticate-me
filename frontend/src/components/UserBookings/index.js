import { useEffect, useState } from "react";
import { useParams, useHistory, Redirect, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRides } from "../../store/rides";
import { loadBookings } from '../../store/bookings';

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

    const formatDateString = (date) => {
        const dateObject = new Date(date);
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObject)
        const day = dateObject.getDay();
        const year = dateObject.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    // const bookingsArr = Object.values(bookings);

    return (
        <div>
            <h2>{user.username}'s Bookings</h2>
            {bookings?.map((booking) => {
                const startDate = formatDateString(booking.startDate);
                const endDate = formatDateString(booking.endDate);

                return (
                    <div key={booking.id}>
                        <NavLink to={`/rides/${booking.rideId}`}>
                            {rides[booking?.rideId]?.name}
                        </NavLink>
                        <div>from: {startDate}</div>
                        <div>to: {endDate}</div>
                    </div>
                )
            })}
        </div>
    );
};

export default UserBookings;
