import { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import StarRatings from 'react-star-ratings';
import { deleteRide } from '../../store/rides';
import { getReviews } from "../../store/reviews";
import { deleteImage } from "../../store/images";
import EditRideForm from '../EditRidePage';
import AddImgForm from "../AddImgForm";
import AddBookingForm from "../AddBookingForm";
import Reviews from "../Reviews";
import ReviewForm from "../Reviews/ReviewForm";
import { Modal2 } from "../Modal";
import './Ride.css';
import { loadRideBookings } from "../../store/bookings";

const RidePage = () => {
    const dispatch = useDispatch();

    const { rideId } = useParams();
    const [showBook, setShowBook] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showAddImg, setShowAddImg] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [imgKey, setImgKey] = useState(Date.now());
    const [rating, setRating] = useState(0);

    const sessionUser = useSelector(state => state.session.user);
    const userId = useSelector((state) => state.session.user?.id);
    const ride = useSelector((state) => state.rides[rideId]);
    const images = useSelector((state) => state.images);
    const reviews = useSelector(state => {
        const reviews = state.reviews;
        return reviews;
    });

    const history = useHistory();
    const redirect = () => history.replace('/rides')

    useEffect(() => {
        setImgKey(Date.now());
    }, [images]);

    useEffect(() => {
        (async () => {
            await dispatch(getReviews(rideId));
            await dispatch(loadRideBookings(rideId))
        })();
    }, [dispatch]);

    useEffect(() => {
        let rating = 0;
        const length = Object.values(reviews).length;
        Object.values(reviews).forEach(review => {
            rating += review.rating / length;
        });
        setRating(rating);
    }, [reviews])

    const noImage = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

    const handleDelete = async () => {
        await dispatch(deleteRide(rideId));
        redirect();
    }

    const bookRideClick = () => {
        setShowBook((prevState) => !prevState);
    }

    const editRideClick = () => {
        setShowEdit((prevState) => !prevState);
        setShowAddImg(false);
    }

    const addImgClick = () => {
        setShowEdit(false);
        setShowAddImg((prevState) => !prevState);
    }
    if (!sessionUser) {
        return (
            <Redirect to="/login" />
        )
    }

    if (!ride) {
        return null;
    }

    return (
        <div className="ride-page-container">
            <div className="img-scroller snaps-inline">
                {ride.Images && ride.Images[0] ?
                    (ride?.Images.map((image) => (
                        <div key={`${image.id}${imgKey}`} className="img-element">
                            <img alt={ride?.name} src={image.url} />
                        </div>
                    ))) :
                    (<div className="img-element">
                        <img alt={ride?.name} src={noImage} />
                    </div>)
                }
            </div>
            <div className="ride-details-container">
                <h2 className="ride-title ride-dtl">
                    {ride?.name}
                </h2>
                <div className="ride-rating">
                    <StarRatings
                        rating={rating}
                        starRatedColor="yellow"
                        starHoverColor="red"
                        numberOfStars={5}
                        name='rating'
                        starEmptyColor='gray'
                        starDimension='2rem'
                        starSpacing='0.2rem'
                    />
                    <span className="ride-rating-number">({rating})</span>
                </div>
                <div className="ride-location ride-dtl">
                    Location: {ride?.location}
                </div>
                <div className="ride-price ride-dtl">
                    Price: {`$${ride?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / day`}
                </div>
                <div className="ride-type ride-dtl">
                    Ride Type: {ride?.travelType}
                </div>
                <div className="ride-speed ride-dtl">
                    Speed: {ride?.speed} mph
                </div>
                <p className="ride-description ride-dtl">
                    {ride?.description}
                </p>
            </div>
            <div className="ride-btn-container" hidden={userId !== ride?.userId}>
                <div className="edit-add-container">
                    {
                        userId !== ride?.userId &&
                        <button
                            className="book-ride-btn ride-btn"
                            onClick={bookRideClick}>
                            Book this Ride
                        </button>
                    }
                    {
                        userId === ride?.userId &&
                        <button
                            className="edit-ride-btn ride-btn"
                            // hidden={userId !== ride?.userId}
                            onClick={editRideClick}>
                            Edit Ride
                        </button>
                    }
                    {
                        userId === ride?.userId &&
                        <button
                            className="add-pic-btn ride-btn"
                            // hidden={userId !== ride?.userId}
                            onClick={addImgClick}>
                            Add a Pic
                        </button>
                    }
                    <div hidden={!showBook}>
                        <AddBookingForm rideId={rideId} userId={userId} bookings={ride?.Bookings} hideForm={() => setShowBook(false)} />
                    </div>
                    <div hidden={!showEdit}>
                        <EditRideForm ride={ride} hideForm={() => setShowEdit(false)} />
                    </div>
                    <div hidden={!showAddImg}>
                        <AddImgForm rideId={rideId} hideForm={() => setShowAddImg(false)} />
                    </div>
                </div>
                {userId === ride?.userId &&
                    <button
                        className="delete-ride-btn ride-btn"
                        // hidden={userId !== ride?.userId}
                        onClick={handleDelete}>
                        Delete Ride
                    </button>
                }
            </div>
            {!reviews[userId] &&
                <button
                    className="button"
                    onClick={() => !showModal && setShowModal(true)}>
                    Review Ride
                </button>
            }
            <Modal2
                title="Write a Review"
                onClose={() => setShowModal(false)}
                show={showModal}
            >
                <ReviewForm hideForm={() => setShowModal(false)} />
            </Modal2>
            <Reviews reviews={Object.values(reviews)} />
        </ div>
    );
}

export default RidePage;
