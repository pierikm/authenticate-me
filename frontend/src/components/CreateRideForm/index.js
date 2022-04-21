import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createRide } from '../../store/rides';
import { getReviews } from "../../store/reviews";
import './CreateRide.css';


const CreateRideForm = ({ hideForm }) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [speed, setSpeed] = useState(0);
    const [travelType, setTravelType] = useState('');
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

    const history = useHistory();
    const redirect = (id) => history.replace(`/rides/${id}`);

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
        }

        // console.log(errors)
        setShowErrors(true);
        if (!errors.length) {
            const createdRide = await dispatch(createRide(payload))
            if (createdRide) {
                hideForm()
                setShowErrors(false);
                reset();
                await dispatch(getReviews(createdRide.id));
                redirect(createdRide.id);
            }
        }
    }

    const reset = () => {
        setName('');
        setLocation('');
        setPrice(0);
        setDescription('');
        setSpeed(0);
        setTravelType('');
    }

    return (
        <div className="create-ride-container">
            <i className="fas fa-times fa-3x" onClick={() => hideForm()}></i>
            <h2 className="create-ride-title">Create a Ride</h2>
            <form className="create-ride-form" onSubmit={handleSubmit}>
                {showErrors && <ul id="create-errors-list">
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>}
                <div className="name-container">
                    <label>Name</label>
                    <input
                        type='text'
                        placeholder="Name"
                        // required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="location-container">
                    <label>Location</label>
                    <input
                        type='text'
                        placeholder="Location"
                        // required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="price-container">
                    <label>Price per day</label>
                    <div id="price-input-container">
                        <span id="dollar-sign">
                            $
                        </span>
                        <input
                            id="price-input"
                            type="number"
                            placeholder="Price"
                            // required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="speed-container">
                    <label>Speed</label>
                    <div>
                        <input
                            type="number"
                            placeholder="Speed"
                            // required
                            value={speed}
                            onChange={(e) => setSpeed(e.target.value)}
                        />
                        <span
                            id="mph">
                            mph
                        </span>
                    </div>
                </div>
                <div className="description-container">
                    <label>Description</label>
                    <textarea
                        placeholder="Description"
                        rows="8"
                        // required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="tarvel-type-container">
                    <select
                        value={travelType}
                        onChange={(e) => setTravelType(e.target.value)}>
                        <option value={''}>Type of Ride</option>
                        {typesOfTravel.map((type) => (
                            <option key={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="create-btn-container">
                    <button id="create-btn" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateRideForm;
