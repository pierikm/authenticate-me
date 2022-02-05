import { useState } from "react"

const CreateRideForm = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');
    const [speed, setSpeed] = useState();
    const [travelType, setTravelType] = useState(undefined);

    const typesOfTravel = [
        'Automobile',
        'Aircraft',
        'Watercraft',
        'Human-Powered',
        'Animal-Powered',
        'Self-Powered',
        'Other'
    ]

    return (
        <form>
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
                placeholder="Location"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={travelType} onChange={(e) => setTravelType(e.target.value)}>
                <option value={undefined}>Select a Type</option>
                {typesOfTravel.map((type) => (
                    <option key={type}>{type}</option>
                ))}
            </select>
            <button type="submit">Submit</button>
        </form>
    )
}

export default CreateRideForm;
