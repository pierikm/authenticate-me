import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRides } from "../../store/rides";

const Rides = () => {
    const dispatch = useDispatch();

    const rides = useSelector(state => {
        return state.rides;
    })

    console.log("rides: ", rides);

    useEffect(() => {
        dispatch(getRides());
    }, [dispatch])
    return (
        <>
            {rides.map((ride) => (
                <div key={ride?.id}>
                    <img src={ride.Images[0] && ride.Images[0].url} />
                    <h2>
                        {ride?.name}
                    </h2>
                    <div>
                        Location: {ride?.location}
                    </div>
                    <div>
                        Price: {`$${ride?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / day`}
                    </div>
                    <div>
                        Ride Type: {ride.travelType}
                    </div>
                    <p>{ride.description}</p>
                </div>
            ))}
        </>
    )
}

export default Rides
