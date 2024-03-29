import React, { useState } from "react";
import * as reviewActions from "../../store/reviewReducer";
import * as spotActions from "../../store/spotReducer";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './CreateReview.css'

function CreateReviewModal({ spots }) {
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(reviewActions.createReview({ review, stars }, spots.id))
            .then(() => dispatch(spotActions.getSingleSpot(spots.id)))
            .then(() => dispatch(reviewActions.getReviews(spots.id)))
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
      <h1 className='create-review-title'>Create Review</h1>
      <form onSubmit={handleSubmit}>
        <ul className='error-message'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Review
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
          Stars
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='create-review-submit-button'>
            Create
        </button>
      </form>
    </>
  );
}

export default CreateReviewModal;
