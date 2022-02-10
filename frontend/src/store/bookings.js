import { csrfFetch } from './csrf';

const ADD = 'bookings/ADD';
const REMOVE = 'bookings/REMOVE';

const add = (booking) => ({
    type: ADD,
    booking
});

const remove = (bookingId) => ({
    type: REMOVE,
    bookingId
});

export const addBooking = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const booking = await response.json();
        dispatch(add(booking));
        return booking;
    }
};

const bookingsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD:
            const addState = { ...state };
            addState[action.booking.id] = action.booking;
            return addState;
        default:
            return { ...state };
    }

}

export default bookingsReducer;
