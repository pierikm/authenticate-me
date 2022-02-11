import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import './SplashPage.css';

const SplashPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) {
        <Redirect to="/rides" />
    }
    return (
        <div className="splash-page">
            <div className="splash-page-container">
                <h2 className="splash-title">Welcome</h2>
                <NavLink className="login splash-btn" to="/login">Login</NavLink>
                <NavLink className="signup splash-btn" to="/signup">Signup</NavLink>
                <button className="demo-button splash-btn">Demo</button>
            </div>
        </div>
    )
}

export default SplashPage;
