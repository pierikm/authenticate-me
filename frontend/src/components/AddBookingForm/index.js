import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { addBooking } from "../../store/bookings";
import './AddBooking.css';


const AddBookingForm = ({ hideForm, userId, rideId }) => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const bookings = useSelector(state => {
        if (state.rides[rideId].Bookings) {
            return Object.values(state.rides[rideId].Bookings)
        }
        else return [];
    })

    const checkDates = () => {
        // const bookingsArr = (bookings ? Object.values(bookings) : []);
        let goodDate = true;

        bookings.forEach((booking) => {
            const start1 = new Date(booking.startDate);
            const end1 = new Date(booking.endDate);
            const start2 = new Date(startDate);
            const end2 = new Date(endDate);

            if (start2 >= start1 && start2 <= end1) goodDate = false //2 starts in 1
            if (end2 >= start1 && end2 <= end1) goodDate = false  //2 ends in 1
            if (start2 <= start1 && end2 >= end1) goodDate = false //1 inside 2
        });
        return goodDate;
    }

    const checkInputs = () => {
        const oneDay = 86400000;
        const errorsArr = [];
        const today = new Date(Date.now() - oneDay);
        const d1 = new Date(startDate);
        const d2 = new Date(endDate);

        if (today > d1) errorsArr.push("Start: Cannot be before today.");
        if (d1 > d2) errorsArr.push("End: Cannot be before start date.");
        if (!checkDates()) errorsArr.push("Ride already booked for this date")

        setErrors(errorsArr);
    }

    const reset = () => {
        setStartDate(new Date());
        setEndDate(new Date());
    }

    useEffect(() => {
        checkInputs();
    }, [startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            userId,
            rideId,
            startDate,
            endDate
        }


        setShowErrors(true);
        if (!errors.length) {
            const newBooking = await dispatch(addBooking(payload, userId));
            if (newBooking) {
                setShowErrors(false);
                reset();
                hideForm();
            }
        }
    };

    return (
        <div className="add-booking-container">
            {/* <h2 className="add-booking-title">
                Book this ride!
            </h2> */}
            <form className="add-booking-form" onSubmit={handleSubmit}>
                {showErrors && <ul id="booking-errors-list">
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>}
                <div className="start-date-container">
                    <label>Start Date</label>
                    <input
                        className="start-date-input date-input"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="end-date-container">
                    <label>End Date</label>
                    <input
                        className="end-date-input date-input"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button id="add-booking-btn">
                    Confirm
                </button>
            </form>
        </div>
    );
}

export default AddBookingForm;
