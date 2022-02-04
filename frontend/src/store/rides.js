

const LOAD = 'rides/LOAD';

const load = (rides) => ({
    type: LOAD,
    rides
})

export const getRides = () => async (dispatch) => {
    const response = await fetch('/api/rides');
    if (response.ok) {
        const rides = await response.json();
        console.log('********************RIDES************')
        console.log(rides);
        dispatch(load(rides));
    }
}

const ridesReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD:
            return [...state, ...action.rides];
        default:
            return state;
    }
}

export default ridesReducer;
