import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { editRide, getSingleRide } from '../../store/rides';
import { addImage } from '../../store/images';

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

const EditRideForm = () => {
    const user = useSelector(state => state.session.user);
    const { rideId } = useParams();
    const ride = useSelector(state => state.rides[rideId]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleRide(rideId));
    }, [dispatch, rideId])

    const [name, setName] = useState(ride?.name);
    const [location, setLocation] = useState(ride?.location);
    const [price, setPrice] = useState(ride?.price);
    const [description, setDescription] = useState(ride?.description);
    const [speed, setSpeed] = useState(ride?.speed);
    const [travelType, setTravelType] = useState(ride?.travelType);
    const [url, setUrl] = useState('');

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

        if (isValidHttpUrl(url)) {
            const imgPayload = {
                rideId,
                url
            };
            dispatch(addImage(imgPayload))
        }

        const editedRide = await dispatch(editRide(payload, ride.id))
        if (editedRide) {
            history.push(`/rides/${editedRide.id}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>

                <input
                    type='text'
                    placeholder="Name"
                    value={name ? name : ''}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder="Location"
                    value={location ? location : ''}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="number"
                    placeholder="Price"
                    value={price ? price : ''}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="number"
                    placeholder="Speed"
                    value={speed ? speed : ''}
                    onChange={(e) => setSpeed(e.target.value)}
                />
            </div>
            <div>
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
            <div>
                <input
                    type='text'
                    placeholder="Image URL"
                    value={url ? url : ''}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default EditRideForm;
