import { csrfFetch } from './csrf';

const LOAD = 'rides/LOAD';
const LOAD_SINGLE = 'rides/LOAD_SINGLE';
const CREATE = 'rides/CREATE';
const EDIT = 'rides/EDIT';

const load = (rides) => ({
    type: LOAD,
    rides
})

const loadSingle = (rides) => ({
    type: LOAD_SINGLE
})

const create = (ride) => ({
    type: CREATE,
    ride
})

const edit = (ride) => ({
    type: EDIT,
    ride
})

// export const getSingleRide = (id) => async (dispatch) => {
//     const response = await fetch(`/api/rides/${id}`);
//     if (response.ok) {
//         const rides = await response.json();
//         dispatch(loadSingle(rides));
//     }
// }

export const getRides = () => async (dispatch) => {
    const response = await fetch('/api/rides');
    if (response.ok) {
        const rides = await response.json();
        dispatch(load(rides));
        return rides;
    }
}

export const createRide = (payload) => async (dispatch) => {
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

// export const editRide = (payload) => async (dispatch) => {
//     const response = await csrfFetch('/api/rides', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//     });
//     if (response.ok) {
//         const newRide = await response.json();
//         dispatch(create(newRide));
//         return newRide;
//     }
// }

const ridesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const loadState = {};
            action.rides.forEach(ride => {
                loadState[ride.id] = ride;
            })
            console.log(loadState);
            return loadState;
        case CREATE:
            const createState = { ...state };
            createState[action.ride.id] = action.ride;
            return createState;
        case LOAD_SINGLE:
            return state;
        // case EDIT:
        //     const editState = [...state];
        //     const editId = action.ride.id;
        //     editState.forEach((ride) => {
        //         if (ride.id === editId) {
        //             ride = action.ride;
        //         }
        //     })

        default:
            return state;
    }
}

export default ridesReducer;
