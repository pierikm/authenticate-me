import { csrfFetch } from './csrf';

const LOAD = 'rides/LOAD';
const CREATE = 'rides/CREATE';

const load = (rides) => ({
    type: LOAD,
    rides
})

const create = (ride) => ({
    type: CREATE,
    ride
})

export const getRides = () => async (dispatch) => {
    const response = await fetch('/api/rides');
    if (response.ok) {
        const rides = await response.json();
        dispatch(load(rides));
        return rides;
    }
}

export const createRide = (payload) => async (dispatch) => {
    console.log(JSON.stringify(payload))
    const response = await csrfFetch('/api/rides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const newRide = await response.json();
        dispatch(create(newRide));
        return newRide;
    }
}

const ridesReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD:
            return [...state, ...action.rides];
        case CREATE:
            return [...state, action.ride];
        default:
            return state;
    }
}

export default ridesReducer;
