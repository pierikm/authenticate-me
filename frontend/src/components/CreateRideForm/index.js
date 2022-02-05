import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createRide } from '../../store/rides';

const CreateRideForm = () => {
    const user = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [speed, setSpeed] = useState(0);
    const [travelType, setTravelType] = useState('');

    const typesOfTravel = [
        'Automobile',
        'Aircraft',
        'Watercraft',
        'Human-Powered',
        'Animal-Powered',
        'Self-Powered',
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
        const createdRide = await dispatch(createRide(payload))
        if (createdRide) {
            history.push(`/rides`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                placeholder="Location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Speed"
                required
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
            />
            <input
                type='textarea'
                placeholder="Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={travelType} onChange={(e) => setTravelType(e.target.value)}>
                <option value={''}>Select a Type</option>
                {typesOfTravel.map((type) => (
                    <option key={type}>{type}</option>
                ))}
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateRideForm;
