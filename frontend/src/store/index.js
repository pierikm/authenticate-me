import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ridesReducer from "./rides";
import imagesReducer from "./images";
import sessionReducer from './session';
import bookingsReducer from "./bookings";

const rootReducer = combineReducers({
  session: sessionReducer,
  rides: ridesReducer,
  images: imagesReducer,
  bookings: bookingsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
