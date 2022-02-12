import { NavLink, Redirect } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import './SplashPage.css';

const SplashPage = () => {
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    // console.log(sessionUser);

    const handleDemo = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    if (sessionUser) {
        return (
            <div className="splash-page">
                <div className="splash-page-container">
                    <h2 className="splash-title">Welcome {sessionUser.username}!</h2>
                    <NavLink className="rides splash-btn" to="/rides">Explore Some Rides!</NavLink>
                    {/* <NavLink className="signup splash-btn" to="/signup">Signup</NavLink> */}
                    {/* <button className="demo-button splash-btn">Demo</button> */}
                </div>
            </div>
        )
    }
    return (
        <div className="splash-page">
            <div className="splash-page-container">
                <h2 className="splash-title">Welcome</h2>
                <NavLink className="login splash-btn" to="/login">Login</NavLink>
                <NavLink className="signup splash-btn" to="/signup">Signup</NavLink>
                <button className="demo-button splash-btn" onClick={(e) => handleDemo(e)}>Demo</button>
            </div>
        </div>
    )
}

export default SplashPage;
