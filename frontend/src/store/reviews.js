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

const edit = (review) => ({
    type: EDIT,
    review
})

const del = (userId) => ({
    type: DELETE,
    userId
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

export const editReview = (payload, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(edit(review));
        return review;
    }
}

export const deleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const userId = await response.json();
        dispatch(del(userId))
        return userId;
    }
}

const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            const loadState = {};
            action.reviews.forEach(review => {
                loadState[review.userId] = review;
            })
            return loadState;
        case CREATE:
            const createState = { ...state };
            createState[action.review.userId] = action.review;
            return createState;
        case EDIT:
            const editState = { ...state };
            editState[action.review.userId] = action.review;
            return editState;
        case DELETE:
            const removeState = { ...state }
            if (removeState[action.userId]) delete removeState[action.userId]
            return removeState;
        default:
            return { ...state };
    }
}

export default reviewsReducer;
