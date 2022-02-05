import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { editRide, getSingleRide } from '../../store/rides';

const EditRideForm = () => {
    const user = useSelector(state => state.session.user);
    const { rideId } = useParams();
    const ride = useSelector(state => state.rides[rideId]);
    // const ride = rides[rideId];
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(rideId, "*********************************")
        dispatch(getSingleRide(rideId));
    }, [])
    // console.log("***********************************************", ride)
    // if (!ride) {
    //     return null;
    // }

    const [name, setName] = useState(ride.name);
    const [location, setLocation] = useState(ride.location);
    const [price, setPrice] = useState(ride.price);
    const [description, setDescription] = useState(ride.description);
    const [speed, setSpeed] = useState(ride.speed);
    const [travelType, setTravelType] = useState(ride.travelType);



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
        const editedRide = await dispatch(editRide(payload, ride.id))
        if (editedRide) {
            history.push(`/rides/${editedRide.id}`);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type='text'
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Speed"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
            />
            <input
                type='textarea'
                placeholder="Description"
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

export default EditRideForm;
