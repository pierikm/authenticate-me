import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleRide, deleteRide } from '../../store/rides';
import { deleteImage } from "../../store/images";
import EditRideForm from '../EditRidePage';

const RidePage = () => {
    const dispatch = useDispatch();
    const { rideId } = useParams();
    const userId = useSelector((state) => state.session.user.id);
    const ride = useSelector((state) => state.rides[rideId]);
    const [showEdit, setShowEdit] = useState(false);

    const history = useHistory();
    const redirect = () => history.replace('/rides')

    useEffect(() => {
        dispatch(getSingleRide(rideId));
    }, [dispatch, rideId]);

    if (!ride) {
        return null;
    }

    const noImage = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

    // useEffect(() => {
    //     setImages(ride.Images)
    // }, [ride]);

    const handleDelete = () => {
        ride.Images.forEach(async (image) => {
            return await dispatch(deleteImage(image.id));
        });
        dispatch(deleteRide(rideId));
        redirect();
    }

    return (
        <>
            <img alt={ride?.name} src={ride.Images ? (ride.Images[0] ? ride.Images[0].url : noImage) : noImage} />
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
                <EditRideForm ride={ride} hideForm={() => setShowEdit(false)} />
            </div>
        </>
    );
}

export default RidePage;
