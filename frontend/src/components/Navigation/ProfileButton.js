import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user, hideForm }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        hideForm();
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button className="user-btn" onClick={openMenu}>
                <i className="fas fa-user-circle fa-2x" />
                <span className="user-btn-text">
                    {user?.username}
                </span>
            </button>
            {showMenu && (
                <div className="profile-dropdown">
                    {/* <span>{user.username}</span> */}
                    <span id="dropdown-email">{user.email}</span>
                    <span>
                        <button className="logout-btn" onClick={logout}>Log Out</button>
                    </span>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
