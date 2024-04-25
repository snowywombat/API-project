import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spotReducer";
import * as reviewActions from "../../store/reviewReducer";
import * as bookingActions from "../../store/bookingReducer";
import * as tagActions from "../../store/tagReducer";
import OpenCreateReviewModalButton from '../CreateReviewModal';
import OpenCreateBookingModalButton from '../CreateBookingModal';
import OpenCreateTagModalButton from "../CreateTagModal";
import OpenEditReviewModalButton from '../EditReviewModal';
import EditSpotModal from '../Spots/SpotEdit';
import './SpotDetails.css'
import CreateReviewModal from '../Reviews/CreateReview';
import CreateBookingForm from '../Bookings/CreateBooking';
import CreateTagForm from "../Tags/CreateTags";
import EditBookingModal from '../Bookings/EditBooking';

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const allSpots = useSelector(state => state.spots);
    // const spotsArr = Object.values(spots)
    const user = useSelector(state => state.session)

    //get reviews
    const reviews = useSelector(state => state.reviews);
    const reviewsArr = Object.values(reviews)

    //get bookings
    const bookings = useSelector(state => state.bookings);

    //get tags
    const tags = useSelector(state => state.tags);
    const tagsArr = Object.values(tags)


    useEffect(() => {
        dispatch(spotActions.getSingleSpot(spotId))
    }, [spotId, dispatch])

    useEffect(() => {
        dispatch(reviewActions.getReviews(spotId))
    }, [spotId, dispatch])

    useEffect(() => {
        dispatch(bookingActions.getBookings(spotId))
    }, [spotId, dispatch])

    useEffect(() => {
        dispatch(tagActions.getTags(spotId))
    }, [spotId, dispatch])


    const handleDelete = (reviewId) => {
        dispatch(reviewActions.removeReview(reviewId))
        .then(() => dispatch(spotActions.getSingleSpot(spots.id)))
    }

    const handleDeleteBooking = (bookingId, e) => {
        e.preventDefault();
        setErrors([]);

        const confirmed = window.confirm("Are you sure you want to delete your booking?");
        if(confirmed) {
            dispatch(bookingActions.removeBooking(bookingId, e))
                .then(() => {
                    dispatch(spotActions.getSingleSpot(spots.id))
                })
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data && data.message) setErrors(data.message);
                    }
                );
        }

    }


    const handleDeleteTag = (tagId) => {
        dispatch(tagActions.removeTag(tagId))
        .then(() => dispatch(spotActions.getSingleSpot(spots.id)))
    }

    const spots = Object.values(allSpots).find(el => el.id === Number(spotId))
    if(!spots) return null;
    const bookingsArr = Object.values(bookings)
        .map(booking => {
            if (spots && spots.id === booking.spotId && (new Date(Date.parse(booking.endDate))).getTime() > Date.now() ) {
            return booking;
            } else {
            return null;
            }
    })

    if(!bookings) return null;
    if(!tags) return null;
    // if(!user) return null;

    if(spots.avgStarRating === 'NaN') {
        spots.avgStarRating = ''
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const timezoneOffset = date.getTimezoneOffset();
        const offsetInMs = timezoneOffset * 60 * 1000;
        const localTime = date.getTime() - offsetInMs + (24 * 60 * 60 * 1000);
        const options = {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };
        return new Date(localTime).toLocaleString('en-US', options);
    }



    return (
    <>
    <div>

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
                            {user.user && +spots.ownerId === user.user.id &&
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
                                            Hosted by: {spots.Owner.firstName} {spots.Owner.lastName}
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
                                            {`$${spots.price}/night`}
                                            </div>
                                            <div>
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
                                    <button onClick={() => handleDelete(review.id)} type="submit" className='delete-review-button'>
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
        {errors && <p>{errors}</p>}
        <div className='booking-main'>


            <div className ='booking-button'>
                <div className = 'create-booking-button'>
                    <CreateBookingForm
                        spots = {spots}
                    />
                </div>
            </div>


            <div className='booking-div'>
                {bookingsArr.map((booking, index) => (
                    booking ? (

                        <div key={index} className='booking-body'>
                            {!user.user && booking && (new Date(Date.parse(booking.endDate))).getTime() > Date.now() &&
                                <div className='current-booking'>
                                    Current Booking:
                                </div>
                            }
                            {user.user && booking && booking.userId !== user.user.id && spots.ownerId !== user.user.id && (new Date(Date.parse(booking.endDate))).getTime() > Date.now() &&
                                <div className='current-booking'>
                                    Current Booking:
                                </div>
                            }
                            {booking && booking.User && (new Date(Date.parse(booking.endDate))).getTime() > Date.now() && user.user && (+booking.userId === user.user.id || spots.ownerId === user.user.id) &&
                                <div className='booking-owner'>
                                    <div className='booking-owner-name'>
                                        {booking.User.firstName} {booking.User.lastName}'s Booking:
                                    </div>
                                </div>
                            }
                            {booking && (new Date(Date.parse(booking.endDate))).getTime() > Date.now() && booking.spotId === spots.id &&
                                <div className='booking-dates'>
                                    <div>
                                        From: {formatDate(booking.startDate)}
                                        <br />
                                        To: {formatDate(booking.endDate)}
                                    </div>
                                </div>
                            }
                            {booking && booking.spotId === +spotId &&
                                <div className='booking-info'>
                                    {user.user && +booking.userId === user.user.id && spots.ownerId !== user.user.id &&
                                        <>
                                            <div className='edit-button'>
                                                <OpenEditReviewModalButton
                                                    buttonText="Edit"
                                                    modalComponent={<EditBookingModal
                                                        bookings={booking}
                                                    />}
                                                />
                                            </div>
                                            <div className='delete-booking-button-div'>
                                                <button onClick={(e) => handleDeleteBooking(booking.id, e)} type="submit" className='delete-booking-button'>
                                                    <i className='fa-solid fa-circle-xmark' style={{ fontSize: 20 }} />
                                                </button>
                                            </div>
                                        </>
                                    }
                                </div>
                            }
                        </div>
                    ) : null
                ))}
            </div>



        </div>


        <h1 className='tags-header'> Tags </h1>
        <div className='tags-main'>
            {user.user && spots.ownerId === user.user.id &&
                <div className='tag-form'>
                    <CreateTagForm
                        spots = {spots}
                    />
                </div>
            }

            <div className='tag-display'>
                {tagsArr.map((tag) => (
                    <>
                    {tag.spotId === spots.id &&
                    <>
                        <div className='tag-name' key={tag.id}>
                            #{tag.tagName}
                        </div>

                        <div className='tag-delete'>
                            {tag && user.user && tag.userId === user.user.id && (
                                <button onClick={() => handleDeleteTag(tag.id)} type="submit" className='delete-tag-button'>
                                    <i className='fa-solid fa-circle-xmark'  style={{fontSize: 20}} />
                                </button>
                            )}
                        </div>
                    </>
                    }

                   </>

                ))}

            </div>
        </div>

    </div>

    </>
    );

}

export default SpotDetails;
