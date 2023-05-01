import { csrfFetch } from './csrf';

const LOAD_TAGS = 'tags/LOAD_TAGS';
const CREATE_TAG = '/tags/CREATE_TAG'
const DELETE_TAG = '/tags/DELETE_TAG'

//action creators
export const loadTags = (tags) => ({
    type: LOAD_TAGS,
    payload: tags
})

export const addTag = (tag) => {
    return {
        type: CREATE_TAG,
        payload: tag
    }
}

export const deleteTag = (tag) => {
    return {
        type: DELETE_TAG,
        payload: tag
    }
}


//thunks
export const getTags = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/tags`);

    if (response.ok) {
      const tags = await response.json();
      dispatch(loadTags(tags));
      return tags;
    }
};

console.log('hello')
export const createTag = (tag, spotId) => async dispatch => {
    const { tagName } = tag;
    console.log('hello')
    console.log(tag, 'tag')

    const response = await csrfFetch(`/api/spots/${spotId}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            tagName
        })
    });

    if (response.ok) {
        const createTag = await response.json();
        console.log(createTag, 'createTag')
        dispatch(addTag(createTag));
        return createTag;
    }
};


export const removeTag = (tagId) => async dispatch => {
    console.log('hielo')
    const response = await csrfFetch(`/api/tags/${tagId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        const removeTag = await response.json();
        console.log(removeTag, 'removeTag')
        dispatch(deleteTag(tagId))
        return removeTag;
    } else if (response.status < 500) {
        const data = await response.json();
        console.log(data.errors, 'data errors')
        if (data.errors) {
            throw data;
        }
      } else {
            return ["An error occurred. Please try again."];
    }
}

const initialState = {};

const tagReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_TAG: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState;
        }
        case LOAD_TAGS: {
            const newState = {...state}
            action.payload.Tags.forEach(tag => {
                newState[tag.id] = tag;
            })
            return newState;
        }
        case DELETE_TAG: {
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default:
            return state;
    }
};

export default tagReducer;
