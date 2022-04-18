import { csrfFetch } from './csrf';

const LOAD = 'reviews/LOAD';
const CREATE = 'reviews/CREATE';
const EDIT = 'reviews/EDIT';
const DELETE = 'reviews/DELETE';

const load = (reviews) => ({
    type: LOAD,
    reviews
})

const create = (review) => ({
    type: CREATE,
    review
})

const edit = (ride) => ({
    type: EDIT,
    ride
})

const del = (rideId) => ({
    type: DELETE,
    rideId
})

export const getReviews = (rideId) => async (dispatch) => {
    const response = await fetch(`/api/rides/${rideId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews));
        return reviews;
    }
}

export const createReview = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(create(review));
        return review;
    }
}

export const editRide = (payload, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/rides/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const editRide = await response.json();
        dispatch(edit(editRide));
        return editRide;
    }
}

export const deleteRide = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/rides/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const rideId = await response.json();
        dispatch(del(rideId))
        return rideId;
    }
}

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const loadState = {};
            action.reviews.forEach(review => {
                loadState[review.id] = review;
            })
            return loadState;
        case CREATE:
            const createState = { ...state };
            createState[action.review.id] = action.review;
            return createState;
        case EDIT:
            const editState = { ...state };
            editState[action.ride.id] = action.ride;
            return editState;
        case DELETE:
            const removeState = { ...state }
            if (removeState[action.rideId]) delete removeState[action.rideId]
            return removeState;
        default:
            return { ...state };
    }
}

export default reviewsReducer;
