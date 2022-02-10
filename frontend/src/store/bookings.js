import { csrfFetch } from './csrf';

const LOAD = 'bookings/LOAD';
const ADD = 'bookings/ADD';
const REMOVE = 'bookings/REMOVE';

const load = (bookings) => ({
    type: LOAD,
    bookings
});

const add = (booking) => ({
    type: ADD,
    booking
});

const remove = (bookingId) => ({
    type: REMOVE,
    bookingId
});

export const loadBookings = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/bookings`);
    if (response.ok) {
        const user = await response.json();
        dispatch(load(user.Bookings));
        console.log("user", user);
        return user.Bookings;
    }
}

export const addBooking = (payload, userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/bookings`, {
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
        case LOAD:
            const loadState = { ...state };
            const bookings = Object.values(action.bookings);
            bookings.forEach(booking => {
                loadState[booking.id] = booking;
            });
            return loadState;
        case ADD:
            const addState = { ...state };
            addState[action.booking.id] = action.booking;
            return addState;
        default:
            return { ...state };
    }

}

export default bookingsReducer;
