import { csrfFetch } from './csrf';

const ADD = 'images/ADD';

const add = (image) => ({
    type: ADD,
    image
});

export const addImage = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const image = await response.json();
        dispatch(add(image));
        return image;
    }
}

const imagesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD:
            const addState = { ...state };
            addState[action.image.id] = action.image;
            return addState;
        default:
            return { ...state };
    }
}

export default imagesReducer;
