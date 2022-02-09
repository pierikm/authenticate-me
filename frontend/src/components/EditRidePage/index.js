import { useState } from "react";
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

        const editedRide = await dispatch(editRide(payload, ride.id))
        if (editedRide) {
            hideForm();
        }
    }

    return (
        <form className="edit-ride-form" onSubmit={handleSubmit}>
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
