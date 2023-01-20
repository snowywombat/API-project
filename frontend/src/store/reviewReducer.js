import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = '/reviews/CREATE_REVIEW'
const DELETE_REVIEW= '/reviews/DELETE_REVIEW'

//action creators
export const load = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const addReview = (addedReview) => {
    return {
        type: CREATE_REVIEW,
        addedReview
    }
}

export const deleteReview = (delReview) => {
    return {
        type: DELETE_REVIEW,
        delReview
    }
}

//thunks
export const getReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
      const reviews = await response.json();
      dispatch(load(reviews));
      return reviews;
    }
};

export const createReview = (oneReview, spotId) => async dispatch => {
    const { review, stars } = oneReview;

    const response1 = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            review,
            stars
        })
    });


    if (response1.ok) {
        const createdReview = await response1.json();
        dispatch(addReview(createdReview))
        return createdReview

        // const response2 = await csrfFetch(`/api/spots/${createdReview.id}/images`,{
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         url: image
        //     })
        // } );

        // if (response2.ok) {
        //     const reviewImage = await response2.json();
        //     const joined = {...createdReview, Image: reviewImage[0].url }
        //     dispatch(addReview(joined));
        //     return joined;
        // }
    }

};

export const removeReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        const remove = await response.json();
        dispatch(deleteReview(reviewId))
        return remove;
    }
}



const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS: {
            const newState = {...state}
            action.reviews.Reviews.forEach(review => {
                newState[review.id] = review;
            })
            return newState;
        }
        case CREATE_REVIEW: {
            const newState = {...state}
            newState[action.addedReview.id] = action.addedReview
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState[action.delReview]
            return newState
        }
        default:
            return state;
    }
};

export default reviewReducer;
