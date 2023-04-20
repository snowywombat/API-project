import { csrfFetch } from './csrf';

const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS';
const LOAD_SINGLE_BOOKING = 'bookings/LOAD_BOOKING';
const CREATE_BOOKING = '/bookings/CREATE_BOOKING';
const EDIT_BOOKING = '/bookings/EDIT_BOOKING';
const DELETE_BOOKING = '/bookings/DELETE_BOOKING';

//action creators
export const getAllBookings = (bookings) => ({
    type: LOAD_BOOKINGS,
    payload: bookings
})

export const getSingleBooking = (booking) => ({
    type: LOAD_SINGLE_BOOKING,
    payload: booking
})

export const createBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        payload: booking
    }
}

export const editBooking = (booking) => {
    return {
        type: EDIT_BOOKING,
        payload: booking
    }
}

export const deleteBooking = (booking) => {
    return {
        type: DELETE_BOOKING,
        payload: booking
    }
}

//thunks

export const getBookings = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const bookings = await response.json();
        dispatch(getAllBookings(bookings));
        return bookings;
    }
}


export const addBooking = (booking, spotId) => async dispatch => {
    const { startDate, endDate } = booking

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            startDate,
            endDate
        })
    })

    if (response.ok) {
        const booking = await response.json();
        dispatch(createBooking(booking));
        return booking;
    }
}

export const updateBooking = (booking, bookingId) => async (dispatch) => {
    const { startDate, endDate } = booking
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            startDate,
            endDate
        })
    });

    if (response.ok) {
        const booking = await response.json();
        console.log(booking, 'booking')
        dispatch(editBooking(booking));
        return booking;

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            throw data;
        }
      } else {
            return ["An error occurred. Please try again."];
    }
}

export const removeBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    })

    if(response.ok) {
        const delBooking = await response.json();
        dispatch(deleteBooking(bookingId));
        return delBooking;
    }
}

const initialState = {};

const bookingReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_BOOKING: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState;
        }
        case LOAD_BOOKINGS: {
            const newState = {...state}
                action.payload.Bookings.forEach(booking => {
                    newState[booking.id] = booking;
                })
            return newState;
        }
        case EDIT_BOOKING: {
            const newState = {...state}
            newState[action.payload.id] = {...newState[action.payload.id], ...action.payload}
            return newState;

        }
        case DELETE_BOOKING: {
            const newState = {...state}
            delete newState[action.payload]
            return newState;
        }
        default:
            return state;
    }
};


export default bookingReducer;
