import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRide } from '../../store/rides';
import EditRideForm from '../EditRidePage';

const RidePage = () => {
    const dispatch = useDispatch();
    const { rideId } = useParams();
    const ride = useSelector((state) => state.rides[rideId]);

    useEffect(() => {
        dispatch(getSingleRide(rideId));
    }, [dispatch])
    return (
        <>
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
                Ride Type: {ride?.travelType}
            </div>
            <p>{ride?.description}</p>
            <EditRideForm />
        </>
    );
}

export default RidePage;
