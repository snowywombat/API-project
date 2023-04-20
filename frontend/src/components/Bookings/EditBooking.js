import React, { useState } from "react";
import * as bookingActions from "../../store/bookingReducer";
import * as spotActions from "../../store/spotReducer";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './EditBooking.css'


function EditBookingModal({ spots, bookings }) {
    const dispatch = useDispatch();

    console.log(typeof(bookings.id), 'id')

    const [startDate, setStartDate] = useState(bookings.startDate);
    const [endDate, setEndDate] = useState(bookings.endDate);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

      const handleSubmit = (e) => {
          e.preventDefault();
          setErrors([]);
          dispatch(bookingActions.updateBooking({ startDate, endDate }, bookings.id))
            //   .then(() => dispatch(spotActions.getSingleSpot(spots.id)))
            //   .then(() => dispatch(bookingActions.getBookings(spots.id)))
              .then(closeModal)
              .catch(
                  async (res) => {
                      const data = await res.json();
                      console.log(data, 'data')
                      if (data && data.errors) setErrors(data.errors);
                  }
              );
      };

    return (
      <>
        <h1 className='edit-booking-title'>Edit Booking</h1>
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
          <button type="submit" className='edit-booking-submit-button'>
              Update Booking
          </button>
        </form>
      </>
    );
  }

  export default EditBookingModal;
