import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRide, deleteRide } from '../../store/rides';
import { deleteImage } from "../../store/images";
import EditRideForm from '../EditRidePage';

const RidePage = () => {
    const [showEdit, setShowEdit] = useState(false);
    const dispatch = useDispatch();
    const { rideId } = useParams();
    const ride = useSelector((state) => state.rides[rideId]);
    const userId = useSelector((state) => state.session.user.id);
    const images = ride?.Images;

    useEffect(() => {
        dispatch(getSingleRide(rideId));
    }, [dispatch, rideId]);

    const handleDelete = () => {
        images.forEach(async (image) => {
            return await dispatch(deleteImage(image.id));
        });
        dispatch(deleteRide(rideId));
    }

    return (
        <>
            <img alt={ride?.name} src={ride?.Images[0] ? ride.Images[0].url : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"} />
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
            <div>
                Speed: {ride?.speed} mph
            </div>
            <p>{ride?.description}</p>
            <button hidden={userId !== ride?.userId} onClick={() => setShowEdit((prevState) => !prevState)}>Edit Ride</button>
            <button hidden={userId !== ride?.userId} onClick={handleDelete}>Delete Ride</button>
            <div hidden={!showEdit}>
                <EditRideForm />
            </div>
        </>
    );
}

export default RidePage;
