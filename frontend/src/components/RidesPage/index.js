import { useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRides } from "../../store/rides";

const Rides = () => {
    const dispatch = useDispatch();

    const rides = useSelector(state => {
        return Object.values(state.rides);
    })

    // console.log("rides: ", rides);

    useEffect(() => {
        dispatch(getRides());
    }, [dispatch])
    return (
        <>
            {rides.map((ride) => (
                <div key={ride?.id}>
                    <NavLink to={`/rides/${ride.id}`}>
                        <img src={ride.Images[0] ? ride.Images[0].url : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"} />
                    </NavLink>
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
                </div>
            ))}
        </>
    )
}

export default Rides
