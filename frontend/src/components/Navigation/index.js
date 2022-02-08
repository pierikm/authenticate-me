import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateRideForm from '../CreateRideForm';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showCreate, setShowCreate] = useState(false);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <span className='create-ride-btn-container'>
                    <button
                        className="create-ride-btn"
                        onClick={() => setShowCreate((prevState) => !prevState)}>
                        Create a Ride
                    </button>
                </span>
                <ProfileButton className="profile-btn session-link" user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink className="login-btn session-link" to="/login">Log In</NavLink>
                <NavLink className="signup-btn session-link" to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <>
            <div className='nav-bar'>
                <span className='home-btn-rides-container'>
                    <NavLink exact to="/"><img className='home-button-img rotate' src="../../images/wheel.png" /></NavLink>
                    <NavLink className="rides-link" exact to='/rides'>Find a Ride</NavLink>
                </span>
                <span className='nav-bar-right'>
                    {isLoaded && sessionLinks}
                </span>
            </div>
            <div
                hidden={!showCreate}
                className="create-ride-container">
                <CreateRideForm className='create-ride-ele' />
            </div>
        </>
    );
}

export default Navigation;
