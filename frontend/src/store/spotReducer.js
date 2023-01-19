import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT';
const EDIT_SPOT = '/spots/EDIT_SPOT'
const CREATE_SPOT = '/spots/CREATE_SPOT'
const DELETE_SPOT = '/spots/DELETE_SPOT'

//action creators
export const load = (spots) => ({
    type: LOAD_SPOTS,
    spots
})

export const spotDetails = (details) => ({
    type: LOAD_SPOT_DETAILS,
    details
})


export const editSpot = (editSpot) => {
    return {
        type: EDIT_SPOT,
        editSpot
    }
}

export const addSpot = (addedSpot) => {
    return {
        type: CREATE_SPOT,
        addedSpot
    }
}

export const deleteSpot = (delSpot) => {
    return {
        type: DELETE_SPOT,
        delSpot
    }
}


//thunks
export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
      const spots = await response.json();
      dispatch(load(spots));
      return spots;
    }
};


export const getSingleSpot = (spotId) => async dispatch => {
const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const details = await response.json();
        dispatch(spotDetails(details));
        return details;
    }
};

export const createSpot = (spot) => async dispatch => {
    const { address, city, state, country, name, description, price, lng=1.0001, lat=1.0001, SpotImages} = spot;

    const response1 = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lng,
            lat
        })
    });

    if (response1.ok) {
        const createdSpot = await response1.json();

        const response2 = await csrfFetch(`api/spots/${createdSpot.id}/images`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: SpotImages,
                preview: true
            })
        } );

        if (response2.ok) {
            const spotImage = await response2.json();
            const joined = {...createdSpot, previewImage: spotImage[0].url }
            dispatch(addSpot(joined));
            return joined;
        }
    }

};

export const updateSpot = (spot, spotId) => async dispatch => {
    const { address, city, state, country, name, description, price, lng=1.0001, lat=1.0001, SpotImages} = spot;
    const response1 = await fetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    });

    if (response1.ok) {
        const updatedSpot = await response1.json();
        console.log('updatedSpot', updatedSpot)

        const response2 = await csrfFetch(`api/spots/${updatedSpot.id}/images`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: SpotImages,
                preview: true
            })
        } );

        if (response2.ok) {
            const spotImage = await response2.json();
            const joined = {...updatedSpot, previewImage: spotImage[0].url }
            dispatch(addSpot(joined));
            return joined;
        }
    }
};

export const removeSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        const deleteSpot = await response.json();
        dispatch(deleteSpot(deleteSpot))
        return deleteSpot;
    }
}

const initialState = {};

const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS: {
            const newState = {...state}
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot;
            })
            return newState;
        }
        case LOAD_SPOT_DETAILS: {
            const newState = {...state}
            newState[action.details.id] = action.details
            return newState;
        }
        case EDIT_SPOT: {
            const newState = {...state}
            newState[action.editSpot.id] = action.editSpot
            return newState;
        }
        case CREATE_SPOT: {
            const newState = {...state}
            newState[action.addedSpot.id] = action.addedSpot
            return newState;
        }
        case DELETE_SPOT: {
            const newState = {...state}
            delete newState[action.delSpot]
            return newState
        }
        default:
            return state;
    }
};

export default spotReducer;
