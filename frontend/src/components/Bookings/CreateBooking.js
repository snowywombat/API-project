import React, { useState } from "react";
import * as bookingActions from "../../store/bookingReducer";
import * as spotActions from "../../store/spotReducer";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './CreateBooking.css'


function CreateBookingModal({ spots }) {
    const dispatch = useDispatch();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

      const handleSubmit = (e) => {
          e.preventDefault();
          setErrors([]);
          dispatch(bookingActions.addBooking({ startDate, endDate }, spots.id))
              .then(() => dispatch(spotActions.getSingleSpot(spots.id)))
              .then(() => dispatch(bookingActions.getBookings(spots.id)))
              .then(closeModal)
              .catch(
                  async (res) => {
                      const data = await res.json();
                      if (data && data.errors) setErrors(data.errors);
                  }
              );
      };

    return (
      <>
        <h1 className='create-booking-title'>Create Booking</h1>
        <form onSubmit={handleSubmit}>
          <ul className='error-message'>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          <button type="submit" className='create-booking-submit-button'>
              Create Booking
          </button>
        </form>
      </>
    );
  }

  export default CreateBookingModal;
