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

const remove = (id) => ({
    type: REMOVE,
    id
});

export const loadBookings = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/bookings`);
    if (response.ok) {
        const user = await response.json();
        dispatch(load(user.Bookings));
        return user.Bookings;
    }
}

export const loadRideBookings = (rideId) => async (dispatch) => {
    const response = await csrfFetch(`/api/rides/${rideId}/bookings`);
    if (response.ok) {
        const bookings = await response.json();
        dispatch(load(bookings));
        return bookings;
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

export const removeBooking = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        // const rideId = await response.json();
        dispatch(remove(id))
        return id;
    }
}

const bookingsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const loadState = {};
            const bookings = Object.values(action.bookings);
            bookings.forEach(booking => {
                loadState[booking.id] = booking;
            });
            return loadState;
        case ADD:
            const addState = { ...state };
            addState[action.booking.id] = action.booking;
            return addState;
        case REMOVE:
            const removeState = { ...state }
            if (removeState[action.id]) delete removeState[action.id];
            return removeState;
        default:
            return { ...state };
    }

}

export default bookingsReducer;
