import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRide } from '../../store/rides';

const RidePage = () => {
    const dispatch = useDispatch();
    const { rideId } = useParams();
    const ride = useSelector(state => {
        return state.rides[rideId];
    })
    console.log(rideId);
    console.log(ride);

    useEffect(() => {
        dispatch(getSingleRide(rideId));
    }, [dispatch])
    return (
        <div>{ride?.name}</div>
    );
}

export default RidePage;
