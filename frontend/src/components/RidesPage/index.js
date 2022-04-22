import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { getRides } from "../../store/rides";
import './Rides.css';

const Rides = () => {
    const dispatch = useDispatch();

    const rides = useSelector(state => {
        return Object.values(state.rides);
    })

    const noImage = "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";

    // console.log("rides: ", rides);

    useEffect(() => {
        (async () => {
            await dispatch(getRides());
        })();
    }, [dispatch])
    return (
        <>
            {rides.map((ride) => (
                <div className='rides-container' key={ride?.id}>
                    <NavLink to={`/rides/${ride.id}`}>
                        <img
                            className='rides-img'
                            alt={ride?.name}
                            src={ride.Images ? (ride.Images[0] ? ride.Images[0].url : noImage) : noImage} />
                    </NavLink>
                    <div className='rides-details-container'>
                        <h2 className='rides-title'>
                            {ride?.name}
                        </h2>
                        <div className='rides-details'>
                            <div className="ride-rating">
                                <StarRatings
                                    rating={ride.rating}
                                    starRatedColor="yellow"
                                    starHoverColor="red"
                                    numberOfStars={5}
                                    name='rating'
                                    starEmptyColor='gray'
                                    starDimension='1.5rem'
                                    starSpacing='0.2rem'
                                />
                                <span className="rides-rating-number">
                                    {ride.rating % 1 === 0 ? ride.rating : ride.rating.toFixed(1)} stars
                                </span>
                            </div>
                            <div className='rides-location'>
                                Location: {ride?.location}
                            </div>
                            <div className='rides-price'>
                                Cost: {`$${ride?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / day`}
                            </div>
                            <div className='rides-travel-type'>
                                Ride Type: {ride?.travelType}
                            </div>
                            <div className='rides-speed'>
                                Speed: {ride?.speed} mph
                            </div>
                            <div className='rides-description-container'>
                                <p className='rides-description'>{ride?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Rides
