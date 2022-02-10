import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { editRide } from '../../store/rides';
// import '../RidePage/Ride.css';

const EditRideForm = ({ ride, hideForm }) => {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const [name, setName] = useState(ride?.name);
    const [location, setLocation] = useState(ride?.location);
    const [price, setPrice] = useState(ride?.price);
    const [description, setDescription] = useState(ride?.description);
    const [speed, setSpeed] = useState(ride?.speed);
    const [travelType, setTravelType] = useState(ride?.travelType);
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false);
    const checkInputs = () => {
        const errorsArr = []
        if (name.length < 2) errorsArr.push("Name: Must be more than 1 character.");
        if (name.length > 255) errorsArr.push("Name: Can be no more than 255 characters.");
        if (location.length < 2) errorsArr.push("Location: Must be more than 1 character.");
        if (location.length > 100) errorsArr.push("Name: Can be no more than 100 characters.");
        if (description.length < 2) errorsArr.push('Description: Describe your ride in greater detail.')
        if (description.length > 1000) errorsArr.push("Description: Describe your ride with less than 1001 characters.");
        if (price < 0) errorsArr.push("Price: You can't pay people to take your ride.");
        if (price > 9999999999.99) errorsArr.push('Price: No ride costs that much on this app.');
        if (speed < 1) errorsArr.push("Speed: Rides with no speed aren't really rides.");
        if (speed > 670600000) errorsArr.push("Speed: Contact the Nobel Foundation about acheiving faster than light travel before posting your ride.");
        if (travelType === '') errorsArr.push('Type of Ride: Please select how your ride goes.')

        setErrors(errorsArr);
        // return (errors.length > 0)
    }

    useEffect(() => {
        checkInputs();
    }, [name, location, price, description, speed, travelType])

    const typesOfTravel = [
        'Automobile',
        'Aircraft',
        'Watercraft',
        'Human-Powered',
        'Animal-Powered',
        'Other'
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            userId: user.id,
            name,
            location,
            price,
            description,
            speed,
            travelType
        };

        setShowErrors(true);

        if (!errors.length) {

            const editedRide = await dispatch(editRide(payload, ride.id))
            if (editedRide) {
                setShowErrors(false);
                hideForm();
            }
        }
    }


    return (
        <form className="edit-ride-form" onSubmit={handleSubmit}>
            {showErrors && <ul id="edit-errors-list">
                {errors.map((error) => <li key={error}>{error}</li>)}
            </ul>}
            <div>
                <label>Name</label>
                <input
                    type='text'
                    placeholder="Name"
                    value={name ? name : ''}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Location</label>
                <input
                    type='text'
                    placeholder="Location"
                    value={location ? location : ''}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div>
                <label>Price per day</label>
                <div id="price-input-container">
                    <span id="dollar-sign">
                        $
                    </span>
                    <input
                        id="price-input"
                        type="number"
                        placeholder="Price"
                        value={price ? price : ''}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </div>
            <div className="edit-speed-container">
                <label>Speed</label>
                <div>
                    <input
                        type="number"
                        placeholder="Speed"
                        value={speed ? speed : ''}
                        onChange={(e) => setSpeed(e.target.value)}
                    />
                    <span
                        id="mph">
                        mph
                    </span>
                </div>
            </div>
            <div>
                <label>Description</label>
                <textarea
                    rows='5'
                    placeholder="Description"
                    value={description ? description : ''}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <select value={travelType} onChange={(e) => setTravelType(e.target.value)}>
                    <option value={''}>Select a Type</option>
                    {typesOfTravel.map((type) => (
                        <option key={type}>{type}</option>
                    ))}
                </select>
            </div>
            <button className="edit-submit-btn ride-btn" type="submit">Submit</button>
        </form>
    )
}

export default EditRideForm;
