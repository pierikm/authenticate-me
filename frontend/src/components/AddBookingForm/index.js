import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addBooking } from "../../store/bookings";
import './AddBooking.css';


const AddBookingForm = ({ hideForm, userId, rideId }) => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);

    const checkInputs = () => {
        const errorsArr = [];
        const today = new Date();
        const d1 = new Date(startDate);
        const d2 = new Date(endDate);

        if (today > d1) errorsArr.push("Start: Cannot be before today.");
        if (d1 > d2) errorsArr.push("End: Cannot be before start date.")

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
            const newBooking = await dispatch(addBooking(payload));
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
