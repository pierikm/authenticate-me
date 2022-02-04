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
                <div key={ride.id}>{ride.name}</div>
            ))}
        </>
    )
}

export default Rides
