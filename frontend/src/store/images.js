import { csrfFetch } from './csrf';

const ADD = 'images/ADD';
const REMOVE = 'images/REMOVE';

const add = (image) => ({
    type: ADD,
    image
});

const remove = (imageId) => ({
    type: REMOVE,
    imageId
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
};

export const deleteImage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const imageId = await response.json();
        dispatch(remove(imageId))
        return imageId;
    }
}

const imagesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD:
            const addState = { ...state };
            addState[action.image.id] = action.image;
            return addState;
        case REMOVE:
            const removeState = { ...state };
            if (removeState[action.imageId]) delete removeState[action.imageId];
            return removeState;
        default:
            return { ...state };
    }
}

export default imagesReducer;
