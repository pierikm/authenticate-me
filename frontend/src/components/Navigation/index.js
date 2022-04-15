import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateRideForm from '../CreateRideForm';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showCreate, setShowCreate] = useState("hide");

    const hideForm = () => {
        setShowCreate('hide');
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <span className='create-ride-btn-container'>
                    <button
                        className="create-ride-btn"
                        onClick={() => setShowCreate((prevState) => prevState === '' ? 'hide' : '')}>
                        Create a Ride
                    </button>
                </span>
                <ProfileButton
                    hideForm={hideForm}
                    className="profile-btn session-link"
                    user={sessionUser} />
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
                    <NavLink exact to="/">
                        <img
                            id="home-button"
                            className='home-button-img rotate'
                            alt='Home'
                            src="../../images/wheel.png"
                            onClick={() => hideForm()} />
                    </NavLink>
                    <NavLink
                        className="rides-link"
                        exact to='/rides'
                        onClick={() => hideForm()}>
                        Find a Ride
                    </NavLink>
                </span>
                <span id="navbar-title">Deals on Wheels</span>
                <span className='nav-bar-right'>
                    {isLoaded && sessionLinks}
                </span>
            </div>
            <div className={`create-ride-main-container ${showCreate}`}>
                <CreateRideForm hideForm={hideForm} className='create-ride-ele' />
            </div>
        </>
    );
}

export default Navigation;
