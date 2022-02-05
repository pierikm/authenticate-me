import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Rides from "./components/RidesPage";
import CreateRideForm from './components/CreateRideForm';
import RidePage from "./components/RidePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
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
          <Route exact path='/rides/new'>
            <CreateRideForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
