import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spotReducer";
import * as reviewActions from "../../store/reviewReducer";
import * as bookingActions from "../../store/bookingReducer";
import OpenCreateReviewModalButton from '../CreateReviewModal';
import OpenCreateBookingModalButton from '../CreateBookingModal';
import EditSpotModal from '../Spots/SpotEdit';
import './SpotDetails.css'
import CreateReviewModal from '../Reviews/CreateReview';
import CreateBookingModal from '../Bookings/CreateBooking';

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const allSpots = useSelector(state => state.spots);
    // const spotsArr = Object.values(spots)
    const user = useSelector(state => state.session.user)

    //get reviews
    const reviews = useSelector(state => state.reviews);
    const reviewsArr = Object.values(reviews)

    //get bookings
    const bookings = useSelector(state => state.bookings);
    const bookingsArr = Object.values(bookings)


    useEffect(() => {
        dispatch(spotActions.getSingleSpot(spotId))
    }, [spotId, dispatch])

    useEffect(() => {
        dispatch(reviewActions.getReviews(spotId))
    }, [spotId, dispatch])

    useEffect(() => {
        dispatch(bookingActions.getBookings(spotId))
    }, [spotId, dispatch])


    const handleDelete = () => {
        reviewsArr.forEach(review => {
            if(review.userId === user.id) {
                dispatch(reviewActions.removeReview(review.id))
                .then(() => dispatch(spotActions.getSingleSpot(spots.id)))
            }
        })
    }

    const handleDeleteBooking = () => {
        bookingsArr.forEach(booking => {
            if(booking.userId === user.id) {
                dispatch(bookingActions.removeBooking(booking.id))
                .then(() => dispatch(spotActions.getSingleSpot(spots.id)))
            }
        })
    }

    const deleteClickBooking = () => {
        const confirmed = window.confirm("Are you sure you want to delete your review?");
        if (confirmed) {
          handleDeleteBooking();
        }

    }

    const spots = Object.values(allSpots).find(el => el.id === Number(spotId))

    if(!spots) return null;
    if(!bookings) return null;

    if(spots.avgStarRating === 'NaN') {
        spots.avgStarRating = ''
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }


    return (
    <>
        {spots &&
            <section className='detail-page'>
                    <div className='details-main'>
                        <div className='details-header'>
                            <div className='details-header-title'>
                            {spots.name}
                            </div>
                            <div className='details-header-info'>
                            {spots.avgStarRating > 0.01 &&
                                <div className='details-header-info-rating'>
                                    {spots.avgStarRating}
                                    <i className='fa-solid fa-star'/>
                                </div>
                            }
                                <div className='breaker'>
                                    <i className='fa-solid fa-circle' style={{fontSize: 3}} />
                                </div>
                                <div className='details-header-info-reviews'>
                                    {spots.numReviews} reviews
                                </div>
                                <div className='breaker'>
                                    <i className='fa-solid fa-circle' style={{fontSize: 3}} />
                                </div>
                                <div className='details-header-info-location'>
                                    {spots.city}, {spots.state}, {spots.country}
                                </div>
                            </div>
                        </div>

                        <div className='edit-button-div'>
                        {user && +spots.ownerId === user.id &&
                                <div className = 'edit-button'>
                                    <OpenCreateReviewModalButton
                                    buttonText="Edit"
                                    modalComponent={<EditSpotModal
                                        spots={spots}
                                    />}
                                />
                                </div>
                            }
                        </div>

                        <div className='details-body'>
                            {spots.SpotImages &&
                                <img className='details-image' src = {`${spots.SpotImages.map(image => image.url)}`} alt='property' key={spots.id}  />
                            }


                            <div className='details-text'>
                                {spots.SpotImages &&
                                    <div className='details-info'>

                                        <div className='details-name'>
                                            <div>
                                                Hosted by
                                            </div>
                                            <div className='details-owner-first-name'>
                                                {spots.Owner.firstName}
                                            </div>
                                            <div className='details-last-name'>
                                                {spots.Owner.lastName}
                                            </div>
                                        </div>
                                        <div className='details-description'>
                                            <div className='details-description-header'>
                                                the space:
                                            </div>
                                            <div className='details-description-body'>
                                                {spots.description}
                                            </div>
                                        </div>
                                        <div className='details-price'>
                                            <div className='details-price-number'>
                                            ${spots.price}
                                            </div>
                                            <div>
                                            /night
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                        </div>

                    </div>
            </section>
        }


        <h1 className='review-header'>Reviews</h1>
        <div className = 'review-main'>
            {reviewsArr.map((review) => (
                <div key={review.id} className = 'review-body'>
                    { review && review.spotId === +spotId && review.User &&

                    <div className='single-review'>


                        <div className='review-info'>
                            {user && +review.userId === user.id &&
                                <div className='delete-review-button-div'>
                                    <button onClick={handleDelete} type="submit" className='delete-review-button'>
                                        <i className='fa-solid fa-circle-xmark'  style={{fontSize: 11}} />
                                    </button>
                                </div>
                            }

                            <div className='review-review'>
                            {review.review}
                            </div>

                            <div className='review-info-review'>
                            <div className='review-info-name'>
                                    -{review.User.firstName}
                                </div>
                                <div className='review-info-stars'>
                                    {review.stars}
                                    <i className='fa-solid fa-star'/>
                                    </div>

                            </div>
                        </div>
                    </div>
                    }
                </div>

            ))}

        </div>

        <div className='review-button'>
            <div className = 'create-review-button'>
                <OpenCreateReviewModalButton
                buttonText="Add Review"
                modalComponent={<CreateReviewModal
                    reviews={reviews}
                    spots={spots}
                    />}
                    />
            </div>
        </div>

        <h1 className='booking-header'>Bookings</h1>
        <div className='booking-main'>
            {bookingsArr.map((booking) => (
                <div key={booking.id} className='booking-body'>

                    {booking && booking.spotId === +spotId && booking.userId === +user.id &&
                    <>
                        <div>
                            {user && +booking.userId === user.id &&
                                <div className='delete-booking-button-div'>
                                    <button onClick={deleteClickBooking} type="submit" className='delete-booking-button'>
                                        <i className='fa-solid fa-circle-xmark'  style={{fontSize: 11}} />
                                    </button>
                                </div>
                            }
                        </div>

                        <div>
                            {user.firstName}
                            {user.lastName}
                            {formatDate(booking.startDate)}
                            {formatDate(booking.endDate)}
                        </div>

                    </>
                    }

                </div>
            ))}
        </div>


        <div className ='booking-button'>
            <div className = 'create-booking-button'>
                <OpenCreateBookingModalButton
                buttonText="Add Booking"
                modalComponent={<CreateBookingModal
                    spots = {spots}
                    />}
                    />
            </div>
        </div>
    </>
    );

}

export default SpotDetails;
