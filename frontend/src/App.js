import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import { getRides } from "./store/rides";
import Navigation from "./components/Navigation";
import Rides from "./components/RidesPage";
// import CreateRideForm from './components/CreateRideForm';
import RidePage from "./components/RidePage";
import UserBookings from "./components/UserBookings";
import PageNotFound from "./components/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getRides());
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/rides'>
            <Rides />
          </Route>
          <Route exact path='/rides/:rideId'>
            <RidePage />
          </Route>
          <Route path='/users/:userId'>
            <UserBookings />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
      {/* <NavLink id="about-link" to="https://github.com/pierikm/deals-on-wheels">About</NavLink> */}
    </>
  );
}

export default App;
